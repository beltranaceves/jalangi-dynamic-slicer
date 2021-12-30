(function () {
  var variables = "Variables: \n";
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

    write: function (iid, name, val, lhs, isGlobal, isScriptLocal) {
      variables += `${val}\n`;
    },
    /**
     * This callback is called when an execution terminates in node.js.  In a browser
     * environment, the callback is called if ChainedAnalyses.js or ChainedAnalysesNoCheck.js
     * is used and Alt-Shift-T is pressed.
     */
    endExecution: function () {
      console.log(variables);
    }
    //node ../../../src/js/commands/jalangi.js --inlineIID --inlineSource --analysis analysis.js example.js
  };
})();
