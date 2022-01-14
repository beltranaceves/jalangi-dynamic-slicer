const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const util = require("util");

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
//   console.log(output);
  J$.result = output;
  return output;
}

function getSliceLines(defUse, code, line) {
  var correctLines = [line]; // Lista de lineas que quiero conservar
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
  variables = defUse.findByLine(line); // Devuelve todas las variables implicadas en una linea
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
