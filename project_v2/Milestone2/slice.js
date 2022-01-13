const jalangi = require("../../src/js/utils/api.js");
const fs = require("fs");
var analysis = fs.readFileSync("./analysis.js").toString();

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
    /*
        TODO: Implement your method that slices the input based on the specified criteria
        */
    fs.readFile(inFile, "utf8", (err, code) => {
      if (err) {
        console.error(err);
        return;
      }
      var instrumentedCode = jalangi.instrumentString(code);

      let analysisResult = jalangi.analyze(instrumentedCode, ["C:/software/jalangi-dynamic-slicer/project_v2/Milestone2/analysis.js"]);
      analysisResult
        .then((result) => {
          console.log("PATATA");
          console.log(result);
        })
        .catch((err) => console.log(err));
    });
    console.log("running slice.js for arguments: " + inFile, outFile, lineNb);
  }

  slice(args.inFile, args.outFile, args.lineNb);
})();
