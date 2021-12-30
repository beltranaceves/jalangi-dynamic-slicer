var tools = require("./tools.js");

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

      console.log(
        "Declaration: ",
        iidToLocation(getGlobalIID(iid)),
        name,
        val,
        isArgument,
        isCatchParam
      );
      defUse.pushDef({
        name: name,
        location: iidToLocation(iid),
        uses: [],
      });
    },
    read: function (iid, name, val, isGlobal, isScriptLocal) {
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushRead({
        name: name,
        location: iidToLocation(iid),
      });
      console.log("Read: ", iidToLocation(getGlobalIID(iid)), name);
    },
    write: function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      variables += `${val}\n`;
      var line = iidToLocation(getGlobalIID(iid)).split(":")[2];
      defUse.pushWrite({
        name: name,
        location: iidToLocation(iid),
        uses: [],
      });
      console.log("Write: ", line, name, val, lhs, isGlobal, isScriptLocal);
    },
    invokeFun: function (iid, f, base, args, val, isConstructor) {
      console.log("Function call: ", f);
      if (f == console.log) {
        return false;
      }
    },
    /**
     * This callback is called when an execution terminates in node.js.
     */
    endExecution: function () {
      // console.log(variables);
      console.log(defUse.defUse);
      // console.log(sandbox.smap);
      console.log(sandbox);
    },
    //node ../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis simple.js example.js
  };
})(J$);
