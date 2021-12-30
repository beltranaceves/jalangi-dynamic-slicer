function DefUse() {
  this.defUse = [];

  this.pushDef = function (definition) {
    this.defUse.push(definition);
  };

  this.pushWrite = function (write) {
    this.defUse.push(write);
  };

  this.pushRead = function (read) {
    var entries = this.findByName(read.name);
    for (const entry of entries) {
      entry.uses.push(read);
    }
  };

  this.findByName = function (name) {
    var foundEntries = [];
    for (const entry of this.defUse) {
      if (entry.name == name) {
        foundEntries.push(entry);
      }
    }
    return foundEntries;
  };
}

module.exports = {
  DefUse,
};
