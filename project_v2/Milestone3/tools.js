/* jshint esversion: 8*/
function DefUse() {
  this.defUse = [];
  this.synonims = {};

  this.pushDef = function (definition) {
    this.defUse.push(definition);
  };

  this.isObject = function (obj) {
    return (
      typeof obj === 'object' &&
      !Array.isArray(obj) &&
      obj !== null
    );
  };


  this.pushNode = function (node) {
    var prev = this.getPreviousOcurrences(node);
    node.prev = prev;
    node.next = [];
    node.isObject = this.isObject(node.value);
    this.defUse.push(node);
  };

  this.getPreviousOcurrences = function (node) {
    var nodes = [];
    for (const entry of this.defUse) {
      if (entry.name == node.name && entry.line <= node.line) {
        nodes.push(entry);
      }
    }
    return nodes;
  };

  this.getNextOcurrences = function (node) {
    if (node.operation == "write") {
      var nodes = [];
      for (const entry of this.defUse) {
        if (entry.line >= node.line && entry != node && entry.operation == "read") {
          if (entry.name == node.name || (this.synonims[entry.name] && this.synonims[entry.name].includes(node.name))) {
            nodes.push(entry);
          }
        }
      }
      return nodes;
    }
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

  this.findByNext = function (node) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.next && entry.next.includes(node)) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.hasNextByOperations = function (node, operations) {
    var foundEntries = [];
    for (const entry of node.next) {
      if (operations.includes(entry.operation)) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.pruneEdges = function () {
    for (const entry of this.defUse) {
      if (entry.operation == "get" || entry.operation == "put") {
        for (const node of entry.next) {
          if (node.operation == "read") {
            if (this.hasNextByOperations(node, ["get", "put"])) {
              entry.next.splice(entry.next.indexOf(node), 1);
            }
          }
        }
      }
    }
  };
  this.complete = function () {
    for (const entry of this.defUse) {
      // this.checkObjectReferenceWrite(entry);
      // // this.checkPut(entry);
      // var next = this.getNextOcurrences(entry);
      // entry.next = next;


      switch (entry.operation) {
        case "read":
          /*
          Find a write in the same line and read.next.push(write)
            if read is an object add synonim to read and write 
          Find a put in the same line  and read.next.push(put)
            if read is an object add synonim to read and put
          Iterate over results of FindByNext(read)
            if read points to get or put 
              if results has put, delete
          */
          var read = entry;
          var writes = this.findByOperationAndByLine(read.line, "write");
          for (const write of writes) {
            read.next.push(write);
            if (read.isObject) {
              this.synonims[read.name] = [write.name, write.shadow];
              this.synonims[write.name] = [read.name, read.shadow];
            }
          }

          var puts = this.findByOperationAndByLine(read.line, "put");
          for (const put of puts) {
            read.next.push(put);
            if (read.isObject) {
              this.synonims[read.name] = [put.name, put.shadow.owner];
              this.synonims[put.name] = [read.name, read.shadow];
            }
          }

          // Iterate over results of FindByNext(read)
          //   if read points to get or put 
          //     if results has put, delete

          // if (this.hasNextByOperation(read, "put") || this.hasNextByOperation(read, "get")) {
          //   var edges = this.findByNext(read);
          //   for (const edge of edges) {
          //     if (edge.operation == "put" || edge.operation == "get") {
          //       edge.next.splice(edge.next.indexOf(read), 1);
          //     }
          //   }
          // }
          break;
        case "write":
          /*
          Iterate over all the entries 
            if entry is after write and  is read
              if entry is same or synonim of write.name
                write.next.push(entry)
          */
          var write = entry;
          for (const entry of this.defUse) {
            if (entry.line > write.line && (entry.operation == "read")) {
              if (entry.name == write.name || (this.synonims[entry.name] && this.synonims[entry.name].includes([write.name, write.shadow]))) {
                write.next.push(entry);
              }
            }
          }
          break;
        case "get":
          /*
          Find a read in the same line with the same parend and read.next.push(get)
          Find a write in the same line and get.next.push(write)
            if get is an object add synonim to read and get
          */
          var get = entry;
          var reads = this.findByOperationAndByLine(get.line, "read");
          for (const read of reads) {
            if (read.shadow == get.shadow) {
              read.next.push(get);
            }
          }

          var writes = this.findByOperationAndByLine(get.line, "write");
          for (const write of writes) {
            get.next.push(write);
            if (get.isObject) {
              this.synonims[get.name] = [write.name, write.shadow];
              this.synonims[write.name] = [get.name, get.shadow];
            }
          }
          break;
        case "put":
          /*
          Find a read in the same line who is the parent and put.next.push(read) then treat read as write
           */
          var put = entry;
          for (const entry of this.defUse) {
            if (entry.line > put.line) {
              if (entry.operation == "get") {
                if (entry.name == put.name || (this.synonims[entry.name] && this.synonims[entry.name].includes([put.name, put.shadow]))) {
                  put.next.push(entry);
                }
              }
              if (entry.operation == "read") {
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
};

module.exports = {
  DefUse
};



/*
  Write: iterate over all entries 
    if entry is after write
      if entry is read and is same or synonim of write.name then write.next.push(entry)
      if entry is get and is same Shadow then write.next.push(entry)
*/