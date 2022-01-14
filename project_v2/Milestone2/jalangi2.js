#!/usr/bin/env node

/*jslint node: true */
/*global process */
/*global J$ */
function analyze(args) {
  var instUtil = require("../../src/js/instrument/instUtil.js");
  var astHandler = null;
  if (args.astHandlerModule) {
    astHandler = require(args.astHandlerModule);
  }

  if (args.script_and_args.length === 0) {
    console.error("must provide script to record");
    process.exit(1);
  }
  // we shift here so we can use the rest of the array later when
  // hacking process.argv; see below
  var script = args.script_and_args.shift();

  var Module = require("module");
  var path = require("path");
  var fs = require("fs");
  const { listenerCount } = require("process");
  var originalLoader = Module._extensions[".js"];
  var FILESUFFIX1 = "_jalangi_";

  acorn = require("acorn");
  esotope = require("esotope");
  require("../../src/js/headers").headerSources.forEach(function (header) {
    require("../../" + header);
  });

  var initParam = null;
  if (args.initParam) {
    initParam = {};
    args.initParam.forEach(function (keyVal) {
      var split = keyVal.split(":");
      if (split.length !== 2) {
        throw new Error("invalid initParam " + keyVal);
      }
      initParam[split[0]] = split[1];
    });
  }
  J$.initParams = initParam || {};
  if (args.analysis) {
    args.analysis.forEach(function (src) {
      require(path.resolve(src));
    });
  }

  Module._extensions[".js"] = function (module, filename) {
    var code = fs.readFileSync(filename, "utf8");
    var instFilename = makeInstCodeFileName(filename);
    var instCodeAndData = J$.instrumentCode({
      code: code,
      isEval: false,
      origCodeFileName: filename,
      instCodeFileName: instFilename,
      inlineSourceMap: !!args.inlineIID,
      inlineSource: !!args.inlineSource,
    });
    instUtil.applyASTHandler(instCodeAndData, astHandler, J$);
    fs.writeFileSync(
      makeSMapFileName(instFilename),
      instCodeAndData.sourceMapString,
      "utf8"
    );
    fs.writeFileSync(instFilename, instCodeAndData.code, "utf8");
    module._compile(instCodeAndData.code, filename);
  };

  if (J$.analysis && J$.analysis.onReady) {
    J$.analysis.onReady(startProgram);
  } else {
    startProgram();
  }

  function makeInstCodeFileName(name) {
    return name
      .replace(/.js$/, FILESUFFIX1 + ".js")
      .replace(/.html$/, FILESUFFIX1 + ".html");
  }

  function makeSMapFileName(name) {
    return name.replace(/.js$/, ".json");
  }

  function startProgram() {
    // hack process.argv for the child script
    script = path.resolve(script);
    var newArgs = [process.argv[0], script];
    newArgs = newArgs.concat(args.script_and_args);
    process.argv = newArgs;
    // this assumes that the endExecution() callback of the analysis
    // does not make any asynchronous calls
    process.on("exit", function () {
      // TODO: go back to this and make sure its true, if not move the endExecution to astHandler ending
      J$.endExecution();
      console.log(J$.result);
      fs.writeFileSync(args.outFile, J$.result, err => {
        if (err) {
          console.error(err)
          return
        }
        //file written successfully
      })
    });

    J$.initParams = {
      inFile: args.inFile,
      outFile: args.outFile,
      lineNb: args.lineNb,
    };
    Module.Module.runMain(script, null, true);
  }
};

module.exports = {
  analyze
}
