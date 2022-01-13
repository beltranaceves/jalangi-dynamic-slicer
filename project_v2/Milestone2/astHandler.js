const acorn = require('acorn');
const { walk } = require("@meriyah-utils/walker");
const escodegen = require('escodegen');
const fs = require('fs');
var code = fs.readFileSync("./example.js").toString();
const util = require('util');

const { exec } = require("child_process"); 

function sliceCode(defUse, inFile, outFile, lineNb) {
    
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
        // console.log(output);
      
}

module.exports = {
    sliceCode
}