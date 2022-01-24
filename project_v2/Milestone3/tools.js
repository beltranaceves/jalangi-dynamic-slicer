/* jshint esversion: 8*/
function DefUse() {
  this.defUse = [];
  this.synonims = {};

  this.pushDef = function (definition) {
    this.defUse.push(definition);
  };

  this.isObject = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  };


  this.pushNode = function (node) {
    var prev = this.getPreviousOcurrences(node);
    node.prev = prev;
    node.next = [];
    node.isObject = this.isObject(node);
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

  this.flatten = function () {
    var lines = [];
    for (const entry of this.defUse) {
      if (!lines.includes(entry.line)) {
        lines.push(entry.line);
      }
    }
    return lines;
  };

  this.checkObjectReferenceWrite = function (entry) {
    if (entry.operation == "read") {
      var nodes = this.findByLine(entry.line);
      for (const node of nodes) {
        if (node.operation == "write") {
          this.synonims[node.name] = entry.name;
          this.synonims[entry.name] = node.name;
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
          Find a put in the same line whose parent is not read and read.next.push(put)
            if read is an object add synonim to read and put
          */
         var read = entry;
          var writes = this.findByOperationAndByLine(read.line, "write");
          for (const write of writes) {
            read.next.push(write);
            if (read.isObject) {
              this.synonims[read.name] = write.name;
              this.synonims[write.name] = read.name;
            }
          }

          var puts = this.findByOperationAndByLine(read.line, "put");
          for (const put of puts) {
            if (put.shadow != read.shadow) {
              read.next.push(put);
              if (read.isObject) {
                this.synonims[read.name] = put.name;
                this.synonims[put.name] = read.name;
              }
            }
          }
          break;
        case "write":
          /*
          Iterate over all the entries 
            if entry is after write and  is read or get
              if entry is same or synonim of write.name
                write.next.push(entry)
          */
         var write = entry;
          for (const entry of this.defUse) {
            if (entry.line > write.line && (entry.operation == "read" || entry.operation == "get")) {
              if (entry.name == write.name || (this.synonims[entry.name] && this.synonims[entry.name].includes(write.name))) {
                write.next.push(entry);
              }
            }
          }
          break;
        case "get":
          /*
          Find a read in the same line with the same parend and get.next.push()
          */
         var get = entry;
          var reads = this.findByOperationAndByLine(get.line, "read");
          for (const read of reads) {
            if (read.shadow == get.shadow) {
              get.next.push(read);
            }
          }
          break;
        case "put":
          /*
          Find a read in the same line who is the parent and put.next.push(read) then treat read as write
           */
          var put = entry;
          var reads = this.findByOperationAndByLine(put.line, "read");
          for (const read of reads) {
            if (read.shadow == put.shadow.owner) {
              put.next.push(read);
              //Treat read as write
              var write = read;
              for (const entry of this.defUse) {
                if (entry.line > write.line && (entry.operation == "read" || entry.operation == "get")) {
                  if (entry.name == write.name || (this.synonims[entry.name] && this.synonims[entry.name].includes(write.name))) {
                    write.next.push(entry);
                  }
                }
              }
            }
          }
          break;
      }
    }
  };
}

module.exports = {
  DefUse
};