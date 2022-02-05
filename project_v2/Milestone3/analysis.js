/* jshint esversion: 8*/
var tools = require("./PDG.js");
const astHandler = require("./astHandler.js");

(function (sandbox) {
  var PDG = new tools.PDG();
  var iidToLocation = sandbox.iidToLocation;
  var getGlobalIID = sandbox.getGlobalIID;

  J$.analysis = {
    read: function (iid, name, val, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      var frame = sandbox.smemory.getShadowObjectOfObject(val);
      PDG.pushNode({
        name: name,
        operation: "read",
        shadow: frame,
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Read: ", line, name, val, isGlobal);
    },
    write: function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      var frame = sandbox.smemory.getShadowObjectOfObject(val);
      PDG.pushNode({
        name: name,
        operation: "write",
        shadow: frame,
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Write: ", line, name, val, lhs, isGlobal, isScriptLocal);
    },
    getFieldPre: function(iid, base, offset, val, isComputed, isOpAssign, isMethodCall) { // TODO: use a better aproach that includes de variable name of the base, this can fail if two objects have the samne atributte
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      var sO = sandbox.smemory.getShadowObject(base, offset, true);
      PDG.pushNode({
        name: offset,
        operation: "get",
        shadow: sO,
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Get: ", line, base, offset, val, isComputed, isOpAssign, isMethodCall);
    },
    putFieldPre: function(iid, base, offset, val, isComputed, isOpAssign) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      var sO = sandbox.smemory.getShadowObject(base, offset, false);
      PDG.pushNode({
        name: offset,
        operation: "put",
        shadow: sO,
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Put: ", line,  base, offset, val, isComputed, isOpAssign);
    },
    conditional: function(iid, result) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      PDG.pushNode({
        operation: "conditional",
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Conditional: ", line, result);
    },
    invokeFunPre: function (iid, f, base, args) {
      if (f == console.log) {
        return { f: f, base: base, args: args, skip: true };
      }
    },
    functionEnter: function(iid, f, dis, args) {
      // console.log("FunctionEnter: ", f.name);
      PDG.functions.push(f.name);
    },
    endExecution: function () {
      var inFile = J$.initParams.inFile;
      var outFile = J$.initParams.outFile;
      var lineNb = J$.initParams.lineNb;

      PDG.code = J$.iids.code;
      astHandler.sliceCode(PDG, inFile, outFile, lineNb, J$.iids.code);

    },
    //node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js --astHandlerModule ast.js
    // node ../src/js/commands/jalangi.js
  };
})(J$);
