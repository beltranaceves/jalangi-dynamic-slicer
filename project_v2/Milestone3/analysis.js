/* jshint esversion: 8*/
var tools = require("./tools.js");
const util = require("util");
const astHandler = require("./astHandler.js");

(function (sandbox) {
  var defUse = new tools.DefUse();
  var variables = "";
  var iidToLocation = sandbox.iidToLocation;
  var getGlobalIID = sandbox.getGlobalIID;
  function getKeyByValue(object, value) {
    value = value.map((entry) => {
      return parseInt(entry);
    });
    for (const entry in object) {
      // console.log(object[entry], value, object[entry] == value);
      if (object[entry] == value) {
        return true;
      }
    }
    return false;
  }

  J$.analysis = {
    //   /**
    //    * This callback is called after a condition check before branching.
    //    * Branching can happen in various statements
    //    * including if-then-else, switch-case, while, for, ||, &&, ?:.
    //    *
    //    * @param {number} iid - Static unique instruction identifier of this callback
    //    * @param {*} result - The value of the conditional expression
    //    * @returns {{result: *}|undefined} - If an object is returned, the result of
    //    * the conditional expression is replaced with the value stored in the
    //    * <tt>result</tt> property of the object.
    //    */
    //   conditional : function (iid, result) {
    //           var id = J$.getGlobalIID(iid);
    //           var branchInfo = branches[id];
    //           if (!branchInfo) {
    //               branchInfo = branches[id] = {trueCount: 0, falseCount: 0};
    //           }
    //           if (result) {
    //               branchInfo.trueCount++;
    //           } else {
    //               branchInfo.falseCount++;
    //           }
    //       },
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
      variables += `${val}\n`;
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
      variables += `${val}\n`;
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
    //node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js --astHandlerModule ast.js
    // node ../src/js/commands/jalangi.js
  };
})(J$);
