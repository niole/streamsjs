"use strict";
var constants = require("./constants.js");

var LAZY = constants.LAZY;
var BLOCK = constants.BLOCK;
var PARENS = constants.PARENS;
var LAZY_VAR_PATTERN = constants.LAZY_VAR_PATTERN;
var IS_VAR = constants.IS_VAR;
var LITERALS = constants.LITERALS;
var DECLARATIONS = constants.DECLARATIONS;
var STATEMENTS = constants.STATEMENTS;
var BOOLEAN_OPS = constants.BOOLEAN_OPS;
var ASSIGNMENTS = constants.ASSIGNMENTS;
var INFIX_OPS = constants.INFIX_OPS
var DELIMETERS = constants.DELIMETERS;

var LEFT_PAREN = DELIMETERS.LEFT_PAREN;
var RIGHT_PAREN = DELIMETERS.RIGHT_PAREN;
var LEFT_BRACKET = DELIMETERS.LEFT_BRACKET;
var RIGHT_BRACKET = DELIMETERS.RIGHT_BRACKET;

var DELIMETER_TYPE = constants.DELIMETER_TYPE;
var CHUNK = constants.CHUNK;
var ASSIGMENT_TYPE = constants.ASSIGMENT_TYPE;
var BOOLEAN_OP_TYPE = constants.BOOLEAN_OP_TYPE;
var INFIX_OP_TYPE = constants.INFIX_OP_TYPE;
var DECLARATION_TYPE = constants.DECLARATION_TYPE;
var VARIABLE_TYPE = constants.VARIABLE_TYPE;
var STATEMENT_TYPE = constants.STATEMENT_TYPE;
var SHORT_HAND_TYPE = constants.SHORT_HAND_TYPE;

function mainTokenizer(content, currIndex, mainAcc) {
  var chr = content[currIndex];
  var nextToken;
  var nextIndex = currIndex;

  var assignment = ASSIGNMENTS[chr];
  var delimeter = DELIMETERS[chr];
  var infix = INFIX_OPS[chr];

  if (delimeter) {
    nextToken = {
      type: DELIMETER_TYPE,
      content: chr,
    };
  } else if (assignment) {
    //check to see if just equals or is boolean_op or
    var res = lookAhead(content, currIndex+1, chr, function(substring) {
      return !!BOOLEAN_OPS[substring];
    });

    nextIndex = res.lastPassingIndex;
    var acc = res.acc;

    if (nextIndex === currIndex) {
      //this is just an equals sign
      nextToken = {
        type: ASSIGMENT_TYPE,
        content: acc,
      };
    } else {
      //this is a boolean op
      nextToken = {
        type: BOOLEAN_OP_TYPE,
        content: acc,
      };
    }
  } else if (infix) {
    var nextChunk = lookAhead(content, currIndex+1, chr, function(substring) {
      return !!ASSIGNMENTS[substring];
    });

    nextIndex = nextChunk.lastPassingIndex;
    var acc = nextChunk.acc;
    if (nextIndex === currIndex) {
      //just normal infix
      nextToken = {
        type: INFIX_OP_TYPE,
        content: chr,
      };
    } else {
      //shorthand
      nextToken = {
        type: SHORT_HAND_TYPE,
        content: acc,
      };
    }

  } else {
    //check if declarations and statements and variables
    var nextChunk = lookAhead(content, currIndex+1, chr, function(substring) {
      return !DELIMETERS[substring] &&
        !BOOLEAN_OPS[substring] &&
        !ASSIGNMENTS[substring] &&
        !INFIX_OPS[substring];
    });

    nextIndex = nextChunk.lastPassingIndex;
    var acc = nextChunk.acc;

    if (nextIndex === currIndex) {
      //it's nothing, return it
      nextToken = {
        type: VARIABLE_TYPE,
        content: acc,
      };
    } else {
      //this is a declaration
      var dec = DECLARATIONS[acc];
      var statement = STATEMENTS[acc];

      if (dec) {
        nextToken = {
          type: DECLARATION_TYPE,
          content: acc,
        };
      } else if (statement) {
        nextToken = {
          type: STATEMENT_TYPE,
          content: acc,
        };
      } else {
        nextToken = {
          type: VARIABLE_TYPE,
          content: acc,
        };
      }
    }
  }

  if (nextIndex < content.length) {
    mainAcc.push(nextToken)
    return mainTokenizer(content, nextIndex+1, mainAcc);
  }
  return mainAcc;
}

function lookAhead(content, currIndex, acc, test) {
  //look ahead and acc until test fails
  var chr = content[currIndex];

  if (currIndex < content.length && test(chr)) {
    acc += chr;
    return lookAhead(content, currIndex+1, acc, test);
  }

  return {
    acc: acc,
    lastPassingIndex: currIndex-1,
  };
}


module.exports = mainTokenizer;
