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
    declare: function (
      iid,
      name,
      val,
      isArgument,
      argumentIndex,
      isCatchParam
    ) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];

      // console.log(
      //   "Declaration: ",
      //   iidToLocation(getGlobalIID(iid)),
      //   name,
      //   val,
      //   isArgument,
      //   isCatchParam
      // );
      // defUse.pushDef({
      //   name: name,
      //   operation: "def",
      //   location: iidToLocation(iid),
      //   line: line,
      //   uses: [],
      // });
    },
    read: function (iid, name, val, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: name,
        operation: "read",
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Read: ", line, name, val, isGlobal);
    },
    write: function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      variables += `${val}\n`;
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: name,
        operation: "write",
        value: val,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      // console.log("Write: ", line, name, val, lhs, isGlobal, isScriptLocal);
    },
    getField: function(iid, base, offset, val, isComputed, isOpAssign, isMethodCall) { // TODO: use a better aproach that includes de variable name of the base, this can fail if two objects have the samne atributte
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: offset,
        operation: "get",
        value: val,
        base: base,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      console.log("Get: ", line, base, offset, val, isComputed, isOpAssign, isMethodCall);
    },
    putField: function(iid, base, offset, val, isComputed, isOpAssign) {
      variables += `${val}\n`;
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushNode({
        name: offset,
        operation: "put",
        value: val,
        base: base,
        location: iidToLocation(iid),
        line: parseInt(line)
      });
      console.log("Put: ", line,  base, offset, val, isComputed, isOpAssign);
    },
    literal: function(iid, val, hasGetterSetter){
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      // console.log(line, val, hasGetterSetter);
    },
    invokeFunPre: function (iid, f, base, args) {
      if (f == console.log) {
        return { f: f, base: base, args: args, skip: true };
      }
    },
    binary: function(iid, op, left, right, result, isOpAssign, isSwitchCaseComparison, isComputed) {
      console.log("");
      if (isOpAssign) {
        console.log(left, right);
      }
    },  

    /**
     * This callback is called when an execution terminates in node.js.
     */
    endExecution: function () {
      var inFile = J$.initParams.inFile;
      var outFile = J$.initParams.outFile;
      var lineNb = J$.initParams.lineNb;
      astHandler.sliceCode(defUse, inFile, outFile, lineNb, J$.iids.code);

    },
    // node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js --astHandlerModule ast.js
    // node ../src/js/commands/jalangi.js
  };
})(J$);
