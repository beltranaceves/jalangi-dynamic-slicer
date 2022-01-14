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
  [correctLines, correctVariables] = exploreLines(
    defUse,
    [line],
    correctLines,
    correctVariables
  );
  return [correctLines, correctVariables];
}

function exploreLines(defUse, lines, correctLines, correctVariables) {
  var line = lines[0];
  variables = defUse.findByLine(line); // Return every slicing criterion in a given line
  for (const variable of variables) {
    for (const use of variable.prev) {
      if (!correctLines.includes(use.line)) {
        correctLines.push(use.line);
        lines.push(use.line);
        if (!correctVariables.includes(use.name)) {
          correctVariables.push(use.name);
        }
      }
    }
    lines = lines.slice(1);
    if (lines.length != 0) {
      exploreLines(defUse, lines, correctLines, correctVariables);
    }
  }
  return [correctLines, correctVariables];
}

module.exports = {
  sliceCode,
};
