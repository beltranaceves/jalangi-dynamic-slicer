function DefUse() {
  this.defUse = [];
  this.synonims = {};

  this.pushDef = function (definition) {
    this.defUse.push(definition);
  };

  this.pushNode = function (node) {
    node.next = [];
    // console.log(node);
    if (
      typeof node.value === 'object' &&
      !Array.isArray(node.value) &&
      node.value !== null
    ) {
      node.isObject = true;
    }
    this.defUse.push(node);
  }

  this.getPreviousOcurrences = function (node) {
    var nodes = [];
    for (const entry of this.defUse) {
      if (entry.name == node.name && entry.line <= node.line) {
        nodes.push(entry);
      }
    }
    return nodes;
  }

  this.findByLine = function (line) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.line == line) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.findWriteByLine = function (line) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.line == line && entry.operation == "write") {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.findReadByLine = function (line) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.line == line && entry.operation == "read") {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };

  this.findByNext = function (node) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.next.includes(node)) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  }

  this.pruneObjects = function () {
    for (const entry of this.defUse) {
      if (entry.isObject) {
        entry.next = [];
      }
    }
  }

  this.complete = function () {
    // this.pruneObjects();
    for (const entry of this.defUse) {

      if (entry.operation == "read") {
        if (entry.isObject) {
          var writes = this.findWriteByLine(entry.line);
          for (const write of writes) {
            entry.next.push(write);
            this.synonims[write.name] = entry.name;
            this.synonims[entry.name] = write.name;
          }
        }
      }

      if (entry.operation == "get") {
        var reads = this.findReadByLine(entry.line);
        var parentVariable = entry;
        for (const read of reads) {
          if (read.value == entry.base) {
            parentVariable = read;
          }
        }
        if (parentVariable.isObject) {
          var writes = this.findWriteByLine(parentVariable.line);
          for (const write of writes) {
            parentVariable.next.push(write);
            this.synonims[write.name] = parentVariable.name;
            this.synonims[parentVariable.name] = write.name;
          }
        }
      }

      if (entry.operation == "write") {
        for (const node of this.defUse) {
          if (node.line >= entry.line && node != entry) {
            if (node.name == entry.name || (this.synonims[node.name] && (this.synonims[node.name].includes(entry.name) ?? false))) {
              entry.next.push(node);
            }
          }
        }
      }

      if (entry.operation == "put") {
        var reads = this.findReadByLine(entry.line);
        var parentVariable = entry;
        for (const read of reads) {
          if (read.value == entry.base) {
            parentVariable = read;
          }
        }
        for (const node of this.defUse) {
          if (node.line >= entry.line && node != entry) {
            if (node.name == parentVariable.name || (this.synonims[node.name] && (this.synonims[node.name].includes(parentVariable.name) ?? false))) {
              entry.next.push(node);
              parentVariable.next.push(entry);
              entry.next.push(parentVariable);
            }
          }
        }
      }
    }
  }

  this.complete2 = function () {
    for (const entry of this.defUse) { // Iterate over all the nodes to build edges
      if (entry.operation != "write" && entry.isObject) {  // Find writes
        var write = this.findWriteByLine(entry.line);
        if (write.length > 0) {
          this.synonims[entry.name] = write[0].name;
          this.synonims[write[0].name] = entry.name;
          write[0].prev.push(entry);
        }
      }
      for (const node of this.defUse) {
        if (node.operation != "write" && node.line < entry.line && (node.name == entry.name || (this.synonims[node.name] && (this.synonims[node.name].includes(entry.name) ?? false)))) {
          // entry.next.push(node);
          node.prev.push(entry);
        }
      }
    }
  }

}

module.exports = {
  DefUse
};
