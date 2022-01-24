/* jshint esversion: 8*/
const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const util = require("util");
const fs = require("fs");

function sliceCode(defUse, inFile, outFile, lineNb, code) {
  var [listLines, listVariables] = getSliceLines(defUse, code, lineNb);
  var length = code.split("\n").length; //TODO ask for the correct way to approach this
  listLines.push(1, length);
  var ast = acorn.parse(code, { locations: true });
  walk(ast, {
    enter(node, parent, prop, index) {
      if (!listLines.includes(node.loc.start.line)) {
        if (node.type == "VariableDeclaration") {
          if (listVariables.includes(node.declarations[0].id.name)) {
            this.skip();
          } else {
            this.remove();
          }
        } else {
          this.remove();
        }
      }
    },
    leave(node, parent, prop, index) {},
  });
  var output = escodegen.generate(ast);
  writeFile(output, outFile);
}

function writeFile(code, outFile) {
  fs.writeFileSync(outFile, code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    //file written successfully
  });
}

function getSliceLines(defUse, code, line) {
  var correctLines = [line]; // List of lines I want to keep
  var correctVariables = [];
  var variables = defUse.findByLine(line);
  [correctLines, correctVariables] = exploreLines(
    defUse,
    variables,
    correctLines,
    correctVariables
  );
  return [correctLines, correctVariables];
}

function exploreLines(defUse, variables, correctLines, correctVariables) {
  defUse.complete();
  while (variables.length > 0) {
    var variable = variables.pop();
    var previous = defUse.findByNext(variable);
    for (const use of previous) {
      if (!correctLines.includes(use.line)) {
        correctLines.push(use.line);
        if (!variables.includes(use.name)) {
          variables.push(use);
        }
      }
      if (!correctVariables.includes(use.name)) {
        correctVariables.push(use.name);
        if (!variables.includes(use.name)) {
          variables.push(use);
        }
      }
    }
  }
  return [correctLines, correctVariables];
}

module.exports = {
  sliceCode,
};
