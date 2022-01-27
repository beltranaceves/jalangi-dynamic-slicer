/* jshint esversion: 8*/
var tools = require("./defUse.js");
const astHandler = require("./astHandler.js");

(function (sandbox) {
  var defUse = new tools.DefUse();
  var iidToLocation = sandbox.iidToLocation;
  var getGlobalIID = sandbox.getGlobalIID;

  J$.analysis = {
    read: function (iid, name, val, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      var frame = sandbox.smemory.getShadowObjectOfObject(val);
      defUse.pushNode({
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
      defUse.pushNode({
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
      defUse.pushNode({
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
      defUse.pushNode({
        name: offset,
        operation: "put",
        shadow: sO,
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Put: ", line,  base, offset, val, isComputed, isOpAssign);
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

      defUse.code = J$.iids.code;
      astHandler.sliceCode(defUse, inFile, outFile, lineNb, J$.iids.code);

    },
    functionEnter: function(iid, f, dis, args) {
      // console.log("FunctionEnter: ", f.name);
      defUse.functions.push(f.name);
    }
    //node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js --astHandlerModule ast.js
    // node ../src/js/commands/jalangi.js
  };
})(J$);
