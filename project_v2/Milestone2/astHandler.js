const acorn = require("acorn");
const codegen = require("shift-codegen");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const fs = require("fs");
const util = require("util");

const { exec } = require("child_process");

function sliceCode(defUse, inFile, outFile, lineNb, code) {
  var listLines = getSliceLines(defUse, code, lineNb);
  var length = code.split('\n').length; //TODO ask for the correct way to approach this
  listLines.push(1, length);
  var ast = acorn.parse(code, { locations: true });
  walk(ast, {
    enter(node, parent, prop, index) {
      if (!listLines.includes(node.loc.start.line)) {
        // if (
        //   node.type == "VariableDeclaration" ||
        //   node.type == "VariableDeclarator"
        // ) {

        this.remove();

        // console.log(util.inspect(node, { depth: 6 }));
      }
    },
    leave(node, parent, prop, index) {},
  });
  var output = escodegen.generate(ast);
  console.log(output);
}

function getSliceLines(defUse, code, line) {
  var correctLines = [line]; // Lista de lineas que quiero conservar
  correctLines = exploreLines(defUse, [line], correctLines);
  return correctLines;
}

function exploreLines(defUse, lines, correctLines) {
  var line = lines[0];
  variables = defUse.findByLine(line); // Devuelve todas las variables implicadas en una linea
  for (const variable of variables) {
    for (const use of variable.prev) {
      if (!correctLines.includes(use.line)) {
        correctLines.push(use.line);
        lines.push(use.line);
      }
    }
    lines = lines.slice(1);
    if (lines.length != 0) {
      exploreLines(defUse, lines, correctLines);
    }
  }
  return correctLines;
}

module.exports = {
  sliceCode,
};
