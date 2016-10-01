"use strict";
var FunctionDec = require("./Function.js");
var FunctionExec = require("./FunctionExec.js");
var Arguments = require("./Arguments.js");

function num(number) {
  return typeof number === "number";
}

function none() {
  return {
      index: null,
      parsed: null
  };
}

var constants = require("./constants.js");
var mainTokenizer = require("./tokenizer.js");
var getLazyVars = require("./lazyVarUtil.js");
var Parseable = require("./Parseable.js");
var StackVariable = require("./StackVariable.js");

var COMMA = constants.COMMA;
var EXPRESSIONS = constants.EXPRESSIONS;
var LAZY_TYPE = constants.LAZY_TYPE;
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
var COMMENTS =  constants.COMMENTS;

var LEFT_PAREN = DELIMETERS.LEFT_PAREN;
var RIGHT_PAREN = DELIMETERS.RIGHT_PAREN;
var LEFT_BRACKET = DELIMETERS.LEFT_BRACKET;
var RIGHT_BRACKET = DELIMETERS.RIGHT_BRACKET;

var CHUNK = constants.CHUNK;
var SPACE = constants.SPACE;

var DELIMETER_TYPE = constants.DELIMETER_TYPE;
var ASSIGMENT_TYPE = constants.ASSIGMENT_TYPE;
var BOOLEAN_OP_TYPE = constants.BOOLEAN_OP_TYPE;
var INFIX_OP_TYPE = constants.INFIX_OP_TYPE;
var DECLARATION_TYPE = constants.DECLARATION_TYPE;
var VARIABLE_TYPE = constants.VARIABLE_TYPE;
var STATEMENT_TYPE = constants.STATEMENT_TYPE;
var SHORT_HAND_TYPE = constants.SHORT_HAND_TYPE;

function parse(content) {
  console.log('content', content);
  //the return of all parse functions is
  //{
  //  index: number | null, parsed: Expression | null
  //}
  var tokens = mainTokenizer(content, 0, []);
  var expr = isExpression(tokens, 0);
  console.log(expr);
  return expr;
}

function isExpression(tokens, index) {
  var func = isFunction(tokens, index);
  console.log('func', func);
  return func;
}

function isFunction(tokens, index) {
  var nextIndex = index;
  var funcDec = isAnonymousFunction(tokens, index);
  var fIndex = funcDec.index;
  var fParsed = funcDec.parsed

  var nextParsed;
  if (fParsed) {
    //any kind of function declaration
    nextParsed = fParsed;
    nextIndex = fIndex;
    var v = isVariable(tokens, fIndex+1);
    var vIndex = v.index;
    var vParsed = v.parsed;
    if (vParsed) {
      nextIndex = vIndex;
      nextParsed.name(tokens(vIndex).content);
    }
  }

  if (!nextParsed) {
    //TODO function execution of other
    var v = isVariable(tokens, nextIndex+1);
    var vIndex = v.index;
    var vParsed = v.parsed;
    if (vParsed) {
       //TODO although this may not be a function execution
      //leave for now
      nextParsed = new FunctionExec(tokens(vIndex).content);
    }
  }

  var funcArgs = isFunctionStartArgs(tokens, nextIndex+1);
  var fAIndex = funcArgs.index;
  var fAParsed = funcArgs.parsed;
  if (fAParsed) {
    //update nextParsed accordingly
    if (nextParsed) {
      nextParsed.addArgument(fAParsed/*TODO how to model argument lists*/);
    }

    //TODO get function block if is of type function
    if (nextParsed.type === "function") {
    console.log('nextParsed', nextParsed);
      var block = isFunctionBlockStart(tokens, fAIndex+1);
      var bIndex = block.index;
      var bAParsed = block.parsed;
      if (bAParsed) {
        nextParsed.updateBlock(bAParsed);
        return nextParsed;
      }
    } else if (nextParsed.type === "executing function") {
        return nextParsed;
    }
  }

  return none();
}

function isFunctionBlockEnd(tokens, index) {
  var space = isSpace(tokens, index);
  index = space.index;

  if (tokens(index).content === "}") {
    return {
      parsed: "}",
      index: index,
    };
  }

  return none();
}

function isFunctionBlockStart(tokens, index) {
  //TODO fix up isSpace, don't know whether
  //to always incrememnt index or not
  //need to settle on one thing to do in terms of
  //handling non matches

  var space = isSpace(tokens, index);
  var sIndex = space.index;
  var sParsed = space.parsed;
  if (sParsed) {
    return space;
  }

  if (tokens(index).content === "{") {
    var expr = isExpression(tokens, index+1);
    var eIndex = expr.index;
    var eParsed = expr.parsed;
    if (eParsed) {
      var end = isFunctionBlockEnd(tokens, eIndex+1);
      var endIndex = end.index;
      var endParsed = end.parsed;
      if (endParsed) {
        return {
          parsed: eParsed,
          index: endIndex,
        };
      }
    }
  }

  var space = isSpace(tokens, index+1);
  var sIndex = space.index;
  var sParsed = space.parsed;
  if (sParsed) {
    return space;
  }

  return none();
}

function isAnonymousFunction(tokens, index) {
  var isFunctionDec = tokens(index).content === "function";
  if (isFunctionDec) {
    return {
        index: index,
        parsed: new FunctionDec("")

    };
  }

  return none();
}

function isVariable(tokens, index) {
  if (index < tokens.length-1 && tokens(index).type === VARIABLE_TYPE) {
    return {
      index: index,
      parsed: tokens(index).type,
    };
  }
  return none();
}

function isFunctionStartArgs(tokens, index) {
  var next;
  var lp = isLeftParen(tokens, index);

  if (lp.parsed) {
    next = lp;
    var midArgs = isFunctionMidArgs(tokens, lp.index+1, []);
    if (midArgs.parsed) {
      midArgs.parsed = new Arguments(midArgs.parsed);
      next = midArgs;
    }

    var rp = isRightParen(tokens, next.index+1);
    if (rp.parsed) {
      return {
        index: rp.index,
        parsed: next.parsed,
      };
    }
  }

  //fail
  return none();
}

function isRightParen(tokens, index) {
  if (tokens(index).content === ")") {
    return {
      index: index,
      parsed: ")",
    };
  }
  return none();
}

function isFunctionMidArgs(tokens, index, args) {
  //returns an array
  //Arguments
  var space = isSpace(tokens, index+1);
  index = space.index;

  var v = isVariable(tokens, index);
  var next;

  if (v.parsed) {
    next = v;
  } else {
    var expr = isExecutableExpression(tokens, index);
    if (expr.parsed) {
      next = expr;
    }
  }

  if (next) {
    var comma = isComma(tokens, next.index+1);
    var cIndex = comma.index;
    var cParsed = comma.parsed;
    return isFunctionMidArgs(tokens, cIndex+1, args.concat([next.parsed]));
  }

  //end
  return {
    parsed: args,
    index: index-1,
  };
}

function isExecutableExpression(tokens, index) {
  var v = isVariable(tokens, index);
  var vIndex = v.index;
  var vParsed = v.parsed;
  if (vParsed) {
    var funcArgs = isFunctionStartArgs(tokens, vIndex+1);
    var fAIndex = funcArgs.index;
    var fAParsed = funcArgs.parsed;
    if (fAParsed) {
      return funcArgs;
    }
  }

  var space = isSpace(tokens, index+1, isExecutableExpression);
  if (num(space)) {
    return space;
  }

  //TODO fail
  return none();
}

function isComma(tokens, index) {
  if (tokens(index).content === ",") {
    return {
      index: index,
      parsed: ",",
    };
  }
  return none();
}

function isLeftParen(tokens, index) {
  if (tokens(index).content === "(") {
    return {
      index: index,
      parsed: "(",
    };
  }
  return none();
}

function isSpace(tokens, index) {
  //TODO catch all the spaces
  if (index < tokens.length-1 && tokens(index).content === " ") {
    return isSpace(tokens, index+1);
  }

  return {
    index: index-1,
    parsed: null
  };
}

module.exports = parse;
