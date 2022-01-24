const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const util = require("util");
const fs = require("fs");
const CFG = require('ast-flow-graph');

function sliceCode(defUse, inFile, outFile, lineNb, code) {
  var [listLines, listVariables] = getSliceLines(defUse, code, lineNb);
  var length = code.split("\n").length; //TODO ask for the correct way to approach this
  listLines.push(1, length);
  var ast = acorn.parse(code, { locations: true });
  // console.log(util.inspect(CFG, { showHidden: true, depth: 3}));
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
    leave(node, parent, prop, index) { },
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
  defUse.complete();
  var variables = defUse.findByLine(line); // Return every slicing criterion in a given line
  var correctLines = []; // List of lines I want to keep
  var correctVariables = [];

  [correctLines, correctVariables] = exploreLines(
    defUse,
    variables,
    [line],
    correctVariables
  );
  return [correctLines, correctVariables];
}

function exploreLines(defUse, variables, correctLines, correctVariables) {
  var nodes = [];
  while (variables.length > 0) {
    var variable = variables.pop();
    var edges = defUse.findByNext(variable);
    for (const edge of edges) {
      if (!nodes.includes(edge)) {
        nodes.push(edge);
        variables.push(edge);
      }
    }
  }
  for (const node of nodes) {
    if (!correctLines.includes(node.line)) {
      correctLines.push(node.line);
    }
    if (!correctVariables.includes(node.name)) {
      correctVariables.push(node.name);
    }
  }
  return [correctLines, correctVariables];
}

function exploreLines2(defUse, lines, correctLines, correctVariables) {
  var line = lines[0];
  variables = defUse.findByLine(line); // Return every slicing criterion in a given line
  for (const variable of variables) {
    for (const use of variable.next) {
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
