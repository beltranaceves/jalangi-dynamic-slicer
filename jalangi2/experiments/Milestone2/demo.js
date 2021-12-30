J$.analysis = {};

(function (sandbox) {
  function AnalysisEngine() {
    var iidToLocation = sandbox.iidToLocation;

    function showLocation(iid) {
      console.log('  Source Location: ' + iidToLocation(iid));
    }


    this.read = function (iid, name, val, isGlobal) {
      console.log('reading variable operation intercepted: ' + name);
      showLocation(iid);
      return val;
    };

    this.write = function (iid, name, val, oldValue) {
      console.log('writing variable operation intercept: ' + name);
      showLocation(iid);
      return val;
    };
  }

})(J$);