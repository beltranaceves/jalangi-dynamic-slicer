function DefUse() {
  this.defUse = [];

  this.pushDef = function (definition) {
    this.defUse.push(definition);
  };

  this.pushNode = function (node) {
    var prev = this.getPreviousOcurrences(node);
    node.prev = prev;
    this.defUse.push(node);
  }

  this.getPreviousOcurrences = function (node) {
    var nodes = [];
    for (const entry of this.defUse) {
      if (entry.name == node.name && entry.line <= node.line && entry.operation == "write") {
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

  this.flatten = function () {
    var lines = [];
    for (const entry of this.defUse) {
      if (!lines.includes(entry.line)) {
        lines.push(entry.line);
      }
    }
    return lines;
  }
}

module.exports = {
  DefUse
};
