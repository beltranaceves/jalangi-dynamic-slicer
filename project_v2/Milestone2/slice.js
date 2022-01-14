const jalangi = require("./jalangi2.js");

(function () {
  const { ArgumentParser } = require("argparse");
  const parser = new ArgumentParser({
    description: "Slices the given file using the specified criteria",
  });
  parser.add_argument("--inFile", {
    help: "JavaScript file to be sliced",
    required: true,
  });
  parser.add_argument("--lineNb", {
    help: "Line number to be used as slicing criteria",
    required: true,
  });
  parser.add_argument("--outFile", {
    help: "Sliced and formated output file",
    required: true,
  });

  const args = parser.parse_args();

  async function slice(inFile, outFile, lineNb) {
    var args = {};
    args.inlineIID = true;
    args.inlineSource = true;
    args.script_and_args = [inFile];
    args.inFile = inFile;
    args.outFile = outFile;
    args.lineNb = parseInt(lineNb),
    args.analysis = ["analysis.js"];

    var results = jalangi.analyze(args);
    console.log(results);
    console.log("running slice.js for arguments: " + inFile, outFile, lineNb);
    // node slice.js --inFile example.js --outFile exampleFix.js --lineNb 2  
  }

  slice(args.inFile, args.outFile, args.lineNb);
})();
