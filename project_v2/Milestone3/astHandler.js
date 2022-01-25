/* jshint esversion: 8*/
const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const util = require("util");
const fs = require("fs");

function sliceCode(defUse, inFile, outFile, lineNb, code) {
  var [lines, variables] = getSliceLines(defUse, code, lineNb);
  var length = code.split("\n").length; //TODO ask for the correct way to approach this
  lines.push(1, length);

  var ast = acorn.parse(code, { locations: true });
  var output = removeLines(ast, lines, variables);
  writeFile(output, outFile);
}

function removeLines(ast, lines, variables) {
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node.type == "IfStatement") {
        console.log(node.loc);
      }
      if (!lines.includes(node.loc.start.line)) {
        if (node.type == "VariableDeclaration") {
          if (variables.includes(node.declarations[0].id.name)) {
            this.skip();
          } else {
            this.remove();
          }
        } else {
          this.remove();
        }
      }
    },
    leave(node, parent, prop, index) { },
  });
  var output = escodegen.generate(ast);
  return output;
}

function writeFile(code, outFile) {
  fs.writeFileSync(outFile, code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function getSliceLines(defUse, code, line) {
  var correctLines = [line]; // List of lines I want to keep
  var correctVariables = [];
  var slicingCriterions = defUse.findByLine(line);
  [correctLines, correctVariables] = exploreBFS(
    defUse,
    slicingCriterions,
    correctLines,
    correctVariables
  );
  return [correctLines, correctVariables];
}

function exploreBFS(defUse, nodes, correctLines, correctVariables) {
  defUse.computeDataDependencies();
  defUse.computeControlDependencies();
  var usedVariables = [];
  while (nodes.length > 0) {
    var node = nodes.pop();
    var previousNodes = defUse.findPreviousNodes(node);
    for (const previousNode of previousNodes) {
      if (!correctLines.includes(previousNode.line)) {
        correctLines.push(previousNode.line);
      }
      if (!correctVariables.includes(previousNode.name)) {
        correctVariables.push(previousNode.name);
      }
      if (!usedVariables.includes(previousNode.name)) {
        nodes.push(previousNode);
      }
    }
  }
  return [correctLines, correctVariables];
}

module.exports = {
  sliceCode,
};
