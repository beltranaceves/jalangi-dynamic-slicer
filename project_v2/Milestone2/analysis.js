var tools = require("./defUse.js");
const util = require("util");
const astHandler = require("./astHandler.js");

(function (sandbox) {
  var defUse = new tools.DefUse();
  var iidToLocation = sandbox.iidToLocation;
  var getGlobalIID = sandbox.getGlobalIID;

  J$.analysis = {
    read: function (iid, name, val, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: name,
        operation: "read",
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Read: ", line, name, val, isGlobal);
    },
    write: function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: name,
        operation: "write",
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Write: ", line, name, val, lhs, isGlobal, isScriptLocal);
    },
    getField: function(iid, base, offset, val, isComputed, isOpAssign, isMethodCall) { // TODO: use a better aproach that includes de variable name of the base, this can fail if two objects have the samne atributte
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: offset,
        operation: "read",
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Read: ", line, base, offset, val, isComputed, isOpAssign, isMethodCall);
    },
    putField: function(iid, base, offset, val, isComputed, isOpAssign) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: offset,
        operation: "write",
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Write: ", line,  base, offset, val, isComputed, isOpAssign);
    },
    invokeFunPre: function (iid, f, base, args) {
      if (f == console.log) {
        return { f: f, base: base, args: args, skip: true };
      }
    },
    endExecution: function () {
      var inFile = J$.initParams.inFile;
      var outFile = J$.initParams.outFile;
      var lineNb = J$.initParams.lineNb;
      astHandler.sliceCode(defUse, inFile, outFile, lineNb, J$.iids.code);

    },
    //node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js --astHandlerModule ast.js
    // node ../src/js/commands/jalangi.js
  };
})(J$);
