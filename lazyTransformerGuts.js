"use strict";

var LAZY = "/*lazy*/";
var SEMI_COLON = ";";
var COMMA = ",";
var SPACE = " ";
var LEFT_PAREN = "(";
var RIGHT_PAREN = ")";
var LEFT_BRACKET = "{";
var RIGHT_BRACKET = "}";
var DOT = ".";

var EQUALS = "=";
var LT = "<";
var GT = ">";
var UNARY = "!";
var PLUS = "+";
var MINUS = "-";

var FOR = "for";
var IN = "in";
var FUNC_DEC = "function";
var VAR_DEC = "var";
var LET = "let";
var CONST = "const";
var NEW = "new";
var SWITCH = "switch";
var CASE = "case";
var IF = "if";
var ELSE = "else";
var CONTINUE = "continue";
var WHILE = "while";
var RETURN = "return";
var TRY = "try";
var CATCH = "catch";
var DEFAULT = "default";
var THROW = "throw";
var BREAK = "break";
var DEBUGGER = "debugger";
var LABEL = "label";
var IMPORT = "import";
var REQUIRE = "require";

var CHUNK = "chunk";

var DELIMETERS = {
  [EQUALS]: EQUALS,
  [LT]: LT,
  [GT]: GT,
  [UNARY]: UNARY,
  [PLUS]: PLUS,
  [MINUS]: MINUS,
  [LEFT_BRACKET]: LEFT_BRACKET,
  [RIGHT_BRACKET]: RIGHT_BRACKET,
  [RIGHT_PAREN]: RIGHT_PAREN,
  [LEFT_PAREN]: LEFT_PAREN,
  [SPACE]: SPACE,
  [COMMA]: COMMA,
  [SEMI_COLON]: SEMI_COLON,
};

var BOOLEAN_OPS = {
  [EQUALS]: EQUALS,
  [LT]: LT,
  [GT]: GT,
  [UNARY]: UNARY,
};

var INFIX_OPS = {
  [EQUALS]: EQUALS,
  [PLUS]: PLUS,
  [MINUS]: MINUS,
};

var DECLARATIONS = {
  [LET]: LET,
  [CONST]: CONST,
  [FUNC_DEC]: FUNC_DEC,
  [VAR_DEC]: VAR_DEC,
  [NEW]: NEW,
};

var STATEMENTS = {
  [LABEL]: LABEL,
  [IMPORT]: IMPORT,
  [REQUIRE]: REQUIRE,
  [DEBUGGER]: DEBUGGER,
  [BREAK]: BREAK,
  [THROW]: THROW,
  [DEFAULT]: DEFAULT,
  [TRY]: TRY,
  [CATCH]: CATCH,
  [CONTINUE]: CONTINUE,
  [RETURN]: RETURN,
  [WHILE]: WHILE,
  [FOR]: FOR,
  [IN]: IN,
  [SWITCH]: SWITCH,
  [CASE]: CASE,
  [IF]: IF,
  [ELSE]: ELSE,
};

var DELIMETER_TYPE = "delimeter";
var LAZY_VAR_PATTERN = /\/\*lazy\*\/\s*var\s*[^\s]+\s*=$/;
var IS_VAR = /([^\s]+)\s*=/;

function getVariable(substring) {
  //gets user defined variable name from substring
  //which passes match with LAZY_VAR_PATTERN
  return substring.match(IS_VAR)[1];
}

function getLazyVars(content, lazyVars) {
  var nextLazy = content.indexOf(LAZY);

  if (nextLazy > -1) {
    var nextEquals = content.indexOf(EQUALS, nextLazy);

    if (nextEquals > -1) {
        var possibleLazyVar = content.slice(nextLazy, nextEquals+1);
        var isLazyVar = LAZY_VAR_PATTERN.test(possibleLazyVar);

        if (isLazyVar) {
          var userDefinedVar = getVariable(possibleLazyVar);
          //lazyVars.push(userDefinedVar);
          lazyVars[userDefinedVar] = true;
        }
    }
    return getLazyVars(content.slice(nextEquals+1), lazyVars);
  }

  return lazyVars;
}

function isLazyDeclaration(tokens, currIndex) {
  //do not add parens to lazyVar preceeded by (right to left) 1 or more spaces, a var, 1 or more spaces,
  //the variable name, 1 or more spaces, a lazy
  var nextIndex = multipleLookBack(tokens, currIndex, function(token) {
    return token.content === SPACE;
  });

  if (nextIndex === currIndex) {
    //there were no spaces
    return false;
  }

  var lastIndexVar = singleLookBack(tokens, nextIndex, function(token) {
    return [VAR_DEC, CONST, LET].indexOf(token.content) > -1;
  });

  if (lastIndexVar > 0 && lastIndexVar !== nextIndex) {
    var lastIndexSpaces = multipleLookBack(tokens, lastIndexVar, function(token) {
      return token.content === SPACE;
    });

    if (lastIndexSpaces === lastIndexVar) {
      //no spaces
      return false;
    }

    return tokens[lastIndexSpaces].content === LAZY;
  }

  return false;
}

function multipleLookBack(tokens, currIndex, check) {
  //checks behind for 1 or more delimeters
  //returns last index where test passes
  if (currIndex > 0) {

    var prevIndex = currIndex-1;
    if (check(tokens[prevIndex])) {
      return multipleLookBack(tokens, prevIndex, check);
    }

  }

  return currIndex;
}

function replaceLazyVars(tokens, currIndex, lazyVars) {
  //returns string that is replaced var
  var curr = tokens[currIndex];

  //since chunks will always be surrounded by delimeters,
  //no need to check prev or next for delimeter type
  //do need to check if is declaration

  if (curr.type === CHUNK && lazyVars[curr.content] && !isLazyDeclaration(tokens, currIndex)) {
    return curr.content+"()";
  }

  return curr.content;
}

function replaceVars(tokens, lazyVars, currIndex, check) {
  /*
    rules:
      do not add parens to lazyVar preceeded by (right to left) 0 or more delimeters (spaces), a var, 0 or more delimeters (spaces), a LAZY
      add parens to lazyVar which is between two delimeters
      otherwise: join together all content

    return concatenated string with changes
  */
  if (currIndex < tokens.length) {
    if (check) {
      var isRightBracket = check(tokens[currIndex]);
      if (!isRightBracket) {
        //keep going till reach right bracketc
        return tokens.content + replaceVars(tokens, lazyVars, currIndex+1, check);
      }
    }

    if (tokens[currIndex].content === LEFT_BRACKET) {
      var lastFunctionIndex = lookBackIsFunctionBlock(tokens, currIndex);

      if (lastFunctionIndex > -1) {
        //yes, we're entering a function block
        //ignore everything
        //TODO: this actually isn't that solid. what about variables
        //captured via closure? Those should also be reactive

        return tokens[currIndex].content + replaceVars(tokens, lazyVars, currIndex+1, function(token) {
          return token.content === RIGHT_BRACKET;
        });
      }
    }



    var nextVar = replaceLazyVars(tokens, currIndex, lazyVars);
    return nextVar + replaceVars(tokens, lazyVars, currIndex+1);
  }

  return "";
}

function singleLookBack(tokens, currIndex, check) {
  //returns last index for which check passes
  if (currIndex > 0 && check(tokens[currIndex-1])) {
    return currIndex-1;
  }

  return currIndex;
}

 /*
   rules (right to left): have already seen a {, next:
   0 or more spaces
   right paren
   (0 or more spaces
   chunk
   0 or more spaces <-- repeat 1 or more times
   (0 or one comma)) or left paren
   0 or 1 Chunk
   function declaration
 */

function lookBackIsFunctionBlock(tokens, currIndex) {
  if (currIndex > 0) {
    //0 or more spaces
    var lastSpaceIndex = multipleLookBack(tokens, currIndex, function(token) {
     return token.content === SPACE;
    });

    if (lastSpaceIndex > 0) {
      //1 right paren
      var lastRighParenIndex = singleLookBack(tokens, lastSpaceIndex, function(token) {
       return token.content === RIGHT_PAREN;
      });

     if (lastRighParenIndex > 0 && lastRighParenIndex !== lastSpaceIndex) {
       var lastParamIndex = lookBackAreParams(tokens, lastRighParenIndex);

       if (lastParamIndex > 0) {
         var lastLeftParenIndex = singleLookBack(tokens, lastParamIndex, function(token) {
           return token.content === LEFT_PAREN;
         });

         if (lastLeftParenIndex > 0 && lastLeftParenIndex !== lastRighParenIndex) {
           //check for 0 or 1 chunk, then function declaration check
           var lastChunkIndex = singleLookBack(tokens, lastLeftParenIndex, function(token) {
               return token.type === CHUNK && token.content !== FUNC_DEC;
           });

           if (lastChunkIndex > 0) {
             var lastFunctionIndex = singleLookBack(tokens, lastChunkIndex, function(token) {
               return token.content === FUNC_DEC;
             });

             if (lastFunctionIndex > 0 && lastFunctionIndex !== lastChunkIndex) {
               return lastFunctionIndex;
             }
           }
         }
       }
      }
    }
  }

  return -1;
}


function lookBackAreParams(tokens, currIndex) {
  //0 or more spaces
  //0 or more chunks
  //  if fails and then commas, return
  //0 or more spaces
  //0 or more commas
  //  if fails and chunks succeeded, return
  //  if succeeds and chunks failed, return
  //repeat

  var lastSpaceIndex = multipleLookBack(tokens, currIndex, function(token) {
    return token.content === SPACE
   });

   var lastChunkIndex = singleLookBack(tokens, lastSpaceIndex, function(token) {
     return token.type === CHUNK;
   });


  var lastSpaceIndex_2 = multipleLookBack(tokens, lastChunkIndex, function(token) {
    return token.content === SPACE
   });

  if (lastChunkIndex === lastSpaceIndex) {
    //no chunks and checked for spaces and return
    //index after extra spaces
    return lastSpaceIndex_2;
  }

  var lastCommaIndex = singleLookBack(tokens, lastSpaceIndex_2, function(token) {
    return token.content === COMMA;
  });

  if (lastCommaIndex !== lastSpaceIndex_2) {
    //there was a comma
    //repeat lookBackParams
    return lookBackAreParams(tokens, lastCommaIndex);
  }

  return -1;
}


function lookBackIsChunk(tokens, currIndex, check) {
   //always only one chunk if exists at all
  if (currIndex > 0 && check(tokens[currIndex-1])) {
    return currIndex-1;
  }
  return currIndex;
}


function mainTokenizer(content, currIndex) {
  var isDelimeter = DELIMETERS[content[currIndex]];
  if (isDelimeter) {
     return [{
       type: DELIMETER_TYPE,
       content: isDelimeter
     }].concat(mainTokenizer(content, currIndex+1));
  }

  //keep going until you see another delimeter and keep what you saw in the interim
  //we only care about variables
  var nextTokenAndState = keepUntilNextDelimeter(content, currIndex, "");
  var endIndex = nextTokenAndState.endIndex;
  var prevToken = nextTokenAndState.token;

  if (endIndex + 1 === content.length) {
      return [prevToken];
  }

  return [prevToken].concat(mainTokenizer(content, endIndex+1));
}

function keepUntilNextDelimeter(content, currIndex, acc) {
  var isDelimeter = DELIMETERS[content[currIndex]];

  if (isDelimeter || currIndex === content.length) {
      return {
        token: {
          type: CHUNK,
          content: acc
        },
        endIndex: currIndex-1
      };
  }

  return keepUntilNextDelimeter(content, currIndex+1, acc+content[currIndex]);
}

function lazy(content) {
  content = "/*lazy*/ var x = 9; function add(x, y) {return x+y;}";
  var lazyVars = getLazyVars(content, {});
  var tokens = mainTokenizer(content, 0);
  var newVars = replaceVars(tokens, lazyVars, 0);
}

lazy();

module.exports = lazy;
