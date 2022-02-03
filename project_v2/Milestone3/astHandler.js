/* jshint esversion: 8*/
const acorn = require("acorn");
const { walk } = require("@meriyah-utils/walker");
const escodegen = require("escodegen");
const util = require("util");
const fs = require("fs");
/*
Questions:

*/
function sliceCode(defUse, inFile, outFile, lineNb, code) {
  var [lines, variables] = getSliceLines(defUse, code, lineNb);
  var functions = defUse.functions;
  var ast = acorn.parse(code, { locations: true });
  // Find main function and pop it from functions
  var mainFunction = findMainFunction(ast, lineNb);
  lines.push(mainFunction.loc.start.line);
  lines.push(mainFunction.loc.end.line);
  var mainFunctionCall = findMainFunctionCall(ast, mainFunction.id.name);
  lines.push(mainFunctionCall.loc.start.line);
  lines.push(mainFunctionCall.loc.end.line);

  functions.splice(functions.indexOf(mainFunction.id.name), 1);

  var output = removeLines(ast, lines, variables, functions);
  writeFile(output, outFile);
}

function findMainFunctionCall(ast, name) {
  var call = null;
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node.type == "CallExpression") {
        if (node.callee.name == name) {
          call = node;
        }
      }
    },
  });
  return call;
}

function findMainFunction(ast, line, type) {
  var mainFunction = null;
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node.loc.start.line == line) {
        var nodeParent = findParentOfNode(ast, node);
        while (nodeParent != null && nodeParent.type != "FunctionDeclaration") {
          nodeParent = findParentOfNode(ast, nodeParent);
        }
        mainFunction = nodeParent;
      }
    },
  });
  return mainFunction;
}

function findParentOfNode(ast, childNode) {
  var returnNode = null;
  walk(ast, {
    enter(node, parent, prop, index) {
      if (node == childNode) {
        returnNode = parent;
      }
    },
  });
  return returnNode;
}

function removeLines(ast, lines, variables, functions) {
  walk(ast, {
    enter(node, parent, prop, index) {
      switch (node.type) {
        case "DoWhileStatement":
          if (!lines.includes(node.loc.end.line)) {
            this.remove();
          }
          break;
        case "FunctionDeclaration":
          if (functions.includes(node.id.name)) {
            this.skip();
          }
          break;
        default:
          if (!lines.includes(node.loc.start.line)) {
            if (node.type == "VariableDeclaration") {
              if (variables.includes(node.declarations[0].id.name)) {
                this.skip();
              } else {
                this.remove();
              }
            } else {
              if (node.type == "BlockStatement") {
                if (containsLines(node, lines)) {
                  this.remove();
                }
              } else {
                this.remove();
              }
            }
          }
          break;
      }
    },
    leave(node, parent, prop, index) { },
  });
  var output = escodegen.generate(ast, { format: { quotes: 'double' } });
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

function containsLines(node, lines) {
  var startLine = node.loc.start.line;
  var endLine = node.loc.end.line;
  var validLines = [];
  for (var i = startLine; i <= endLine; i++) {
    if (lines.includes(i)) {
      validLines.push(i);
    }
  }
  return (validLines.length == 0);
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
    previousNodes.push(node);
    for (const previousNode of previousNodes) {
      if (!correctLines.includes(previousNode.line)) {
        correctLines.push(previousNode.line);
      }
      if (!correctVariables.includes(previousNode.name)) {
        correctVariables.push(previousNode.name);
      }
      if (!usedVariables.includes(previousNode)) {
        usedVariables.push(previousNode);
        nodes.push(previousNode);
      }
    }
  }
  return [correctLines, correctVariables];
}

module.exports = {
  sliceCode,
};
