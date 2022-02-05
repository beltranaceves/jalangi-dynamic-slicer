/* jshint esversion: 8*/
const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");

function PDG() {
  this.defUse = [];
  this.synonims = {};
  this.code;
  this.functions = [];

  this.isObject = function (obj) {
    return (
      typeof obj === 'object' &&
      !Array.isArray(obj) &&
      obj !== null
    );
  };

  this.pushNode = function (node) {
    node.next = [];
    node.isObject = this.isObject(node.value);
    this.defUse.push(node);
  };

  this.findByLine = function (line) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.line == line) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.findByOperationAndByLine = function (line, operation) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.line == line && entry.operation == operation) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.findPreviousNodes = function (node) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.next && entry.next.includes(node)) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.getOutgoinNodesByOperations = function (node, operations) {
    var foundEntries = [];
    for (const entry of node.next) {
      if (operations.includes(entry.operation)) {
        foundEntries.push(entry);
      }
    }
    if (foundEntries.length == 0) {
      foundEntries = null;
    }
    return foundEntries;
  };

  this.pruneEdges = function () {
    for (const entry of this.defUse) {
      if (entry.operation == 'get' || entry.operation == 'put') {
        for (const node of entry.next) {
          if (node.operation == 'read') {
            if (this.getOutgoinNodesByOperations(node, ['get', 'put'])) {
              entry.next.splice(entry.next.indexOf(node), 1);
            }
          }
        }
      }
    }
  };

  this.computeDataDependencies = function () {
    for (const entry of this.defUse) {

      switch (entry.operation) {
        case 'conditional':
          /*
          Find all nodes in the same line as conditional
            for each node, node.next.push(conditional)
          */
          var conditional = entry;
          var nodes = this.findByLine(conditional.line);
          for (const node of nodes) {
            node.next.push(conditional);
          }
          break;
        case 'read':
          /*
          Find a write in the same line and read.next.push(write)
            if read is an object add synonim to read and write 
          Find a put in the same line and read.next.push(put)
            if read is an object add synonim to read and put
          Find a get in the same line and read.next.push(get)
            if read is an object add synonim to read and get
          */
          var read = entry;
          var writes = this.findByOperationAndByLine(read.line, 'write');
          for (const write of writes) {
            read.next.push(write);
            if (read.isObject) {
              this.synonims[read.name] = [write.name, write.shadow];
              this.synonims[write.name] = [read.name, read.shadow];
            }
          }

          var puts = this.findByOperationAndByLine(read.line, 'put');
          for (const put of puts) {
            read.next.push(put);
            if (read.isObject) {
              this.synonims[read.name] = [put.name, put.shadow.owner];
              this.synonims[put.name] = [read.name, read.shadow];
            }
          }

          var gets = this.findByOperationAndByLine(read.line, 'get');
          for (const get of gets) {
            read.next.push(get);
            if (read.isObject) {
              this.synonims[read.name] = [get.name, get.shadow.owner];
              this.synonims[get.name] = [read.name, read.shadow];
            }
          }
          break;
        case 'write':
          /*
          Iterate over all the entries 
            if entry is after write and  is read
              if entry is same or synonim of write.name
                write.next.push(entry)
          */
          var write = entry;
          for (const entry of this.defUse) {
            if (entry.line > write.line && (entry.operation == 'read')) {
              if (entry.name == write.name || (this.synonims[entry.name] && this.synonims[entry.name].includes([write.name, write.shadow]))) {
                write.next.push(entry);
              }
            }
          }
          break;
        case 'get':
          /*
          Find a read in the same line with the same parend and read.next.push(get)
          Find a write in the same line and get.next.push(write)
            if get is an object add synonim to read and get
          */
          var get = entry;
          var reads = this.findByOperationAndByLine(get.line, 'read');
          for (const read of reads) {
            if (read.shadow == get.shadow) {
              read.next.push(get);
            }
          }

          var writes = this.findByOperationAndByLine(get.line, 'write');
          for (const write of writes) {
            get.next.push(write);
            if (get.isObject) {
              this.synonims[get.name] = [write.name, write.shadow];
              this.synonims[write.name] = [get.name, get.shadow];
            }
          }
          break;
        case 'put':
          /*
          Find a read in the same line who is the parent and put.next.push(read) then treat read as write
           */
          var put = entry;
          for (const entry of this.defUse) {
            if (entry.line > put.line) {
              if (entry.operation == 'get') {
                if (entry.name == put.name || (this.synonims[entry.name] && this.synonims[entry.name].includes([put.name, put.shadow]))) {
                  put.next.push(entry);
                }
              }
              if (entry.operation == 'read') {
                if (entry.shadow == put.shadow.owner || (this.synonims[entry.name] && this.synonims[entry.name].includes([put.name, put.shadow]))) {
                  put.next.push(entry);
                }
              }
            }
          }
          break;
      }
    }
    this.pruneEdges();
  };

  this.addUntrackableNodes = function (ast, PDG, untrackableNodes) {
    walk(ast, {
      enter(node, parent, prop, index) {
        if (untrackableNodes.includes(node.type)) {
          PDG.pushNode(
            {
              name: node.type,
              operation: node.type,
              shadow: null,
              value: null,
              location: node.start,
              line: node.loc.start.line
            }
          );
        }
      },
    });
  };

  this.addSwitchCases = function (ast, PDG, untrackableNodes) {
    walk(ast, {
      enter(node, parent, prop, index) {
        if (node.type == "SwitchCase") {
          var caseNode = {
            name: node.type,
            operation: node.type,
            shadow: null,
            value: null,
            location: node.start,
            line: node.loc.start.line
          };
          PDG.pushNode(caseNode);
          for (const entry of PDG.defUse) {
            if (entry.line >= node.loc.start.line && entry.line <= node.loc.end.line) {
              caseNode.next.push(entry);
              if (untrackableNodes.includes(entry.name)) {
                entry.next.push(caseNode);
              }
            }
          }
        }
      },
    });
  };

  this.computeControlDependencies = function () {
    // var conditionalTypes = ['IfStatement', 'WhileStatement', 'DoWhileStatement', 'ForStatement', 'SwitchStatement'];
    var ast = acorn.parse(this.code, { locations: true });
    var PDG = this;
    var untrackableNodes = ["BreakStatement", "ContinueStatement"];
    this.addUntrackableNodes(ast, PDG, untrackableNodes);
    this.addSwitchCases(ast, PDG, untrackableNodes);
    walk(ast, {
      enter(node, parent, prop, index) {
        var conditional = PDG.findByOperationAndByLine(node.loc.start.line, 'conditional');
        if (conditional != []) {
          switch (node.type) {
            case "IfStatement":
              // console.log("IfStatement", node.loc);
              for (const entry of PDG.defUse) {
                if (entry.line > node.loc.start.line && entry.line < node.loc.end.line) {
                  conditional[0].next.push(entry);
                  if (untrackableNodes.includes(entry.name)) {
                    entry.next.push(conditional[0]);
                  }
                }
              }
              break;
            case "WhileStatement":
              // console.log("WhileStatement", node.loc);
              for (const entry of PDG.defUse) {
                if (entry.line > node.loc.start.line && entry.line < node.loc.end.line) {
                  conditional[0].next.push(entry);
                  if (untrackableNodes.includes(entry.name)) {
                    entry.next.push(condition);
                  }
                }
              }
              break;
            case "ForStatement":
              // console.log("ForStatement", node.loc);
              for (const entry of PDG.defUse) {
                if (entry.line > node.loc.start.line && entry.line < node.loc.end.line) {
                  conditional[0].next.push(entry);
                  if (untrackableNodes.includes(entry.name)) {
                    entry.next.push(conditional[0]);
                  }
                }
              }
              break;
            case "SwitchStatement":
              // console.log("SwitchStatement", node.loc);
              var discriminants = PDG.findByLine(node.loc.start.line);
              for (const discriminant of discriminants) {
                for (const entry of PDG.defUse) {
                  if (entry.line > node.loc.start.line && entry.line < node.loc.end.line && entry.operation == 'SwitchCase') {
                    discriminant.next.push(entry);
                  }
                }
              }
              break;
            case "DoWhileStatement":
              // console.log("DoWhileStatement", node.loc);
              for (const entry of PDG.defUse) {
                if (entry.line > node.loc.start.line && entry.line < node.loc.end.line) {
                  conditional[0].next.push(entry);
                  if (untrackableNodes.includes(entry.name)) {
                    entry.next.push(conditional[0]);
                  }
                }
              }
              break;
            default:
              break;
          }
        }
      },
      leave(node, parent, prop, index) { },
    });

  };
}

module.exports = {
  PDG
};