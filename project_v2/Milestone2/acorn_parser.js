const acorn = require('acorn');
const { walk } = require("@meriyah-utils/walker");
const escodegen = require('escodegen');
const fs = require('fs');
var code = fs.readFileSync("./example.js").toString();
const util = require('util');

const { exec } = require("child_process");

(function() {
    
    // const { ArgumentParser } = require("argparse");
    // const parser = new ArgumentParser({
    //     description: "Slices the given file using the specified criteria"
    // });
    // parser.add_argument(
    //     "--inFile", { help: "JavaScript file to be sliced", required: true });
    // parser.add_argument(
    //     "--lineNb", { help: "Line number to be used as slicing criteria", required: true });
    // parser.add_argument(
    //     "--outFile", { help: "Sliced and formated output file", required: true });

    // const args = parser.parse_args();

    // cutLines(args.inFile, args.outFile, args.listLines);
    cutLines("./example.js", null, [1, 2, 5, 6, 8, 10], "x");

})();

function cutLines(inFile, outFile, listLines, variable) {
    
    
        var ast = acorn.parse(code, {locations: true});
        walk(ast, {
            enter(node, parent, prop, index) {
              // some code happens
            },
            leave(node, parent, prop, index) {
                if (node.type == "VariableDeclaration") {
                    console.log(util.inspect(node, { depth: 6 }));
                    // console.log(node.declarations[0].id.name);
                }
                if (!listLines.includes(node.loc.start.line))  {
                    // this.remove();
                }
            }
        });
        var output = escodegen.generate(ast);
        exec("touch a", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
          });
        // console.log(output);
      
}