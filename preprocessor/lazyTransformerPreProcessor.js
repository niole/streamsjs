"use strict";
var getLazyVars = require("./LazyVarUtil.js");
var mainTokenizer = require("./tokenizer.js");
var constants = require("./constants.js");

var DELIMETERS = constants.DELIMETERS;
var DECLARATIONS = constants.DECLARATIONS;

var DELIMETER_TYPE = constants.DELIMETER_TYPE;
var LAZY = constants.LAZY;
var CHUNK = constants.CHUNK;
var EQUALS = constants.EQUALS;



function isLazyDeclaration(tokens, currIndex) {
  //do not add parens to lazyVar preceeded by (right to left) 1 or more spaces, a var, 1 or more spaces,
  //the variable name, 1 or more spaces, a lazy
  var nextIndex = multipleLookBack(tokens, currIndex, function(token) {
    return token.content === DELIMETERS.SPACE;
  });

  if (nextIndex === currIndex) {
    //there were no spaces
    return false;
  }

  var lastIndexVar = singleLookBack(tokens, nextIndex, function(token) {
    return [DECLARATIONS.VAR_DEC, DECLARATIONS.CONST, DECLARATIONS.LET].indexOf(token.content) > -1;
  });

  if (lastIndexVar > 0 && lastIndexVar !== nextIndex) {
    var lastIndexSpaces = multipleLookBack(tokens, lastIndexVar, function(token) {
      return token.content === DELIMETERS.SPACE;
    });

    if (lastIndexSpaces > 0 && lastIndexSpaces !== lastIndexVar) {
      return tokens[lastIndexSpaces-1].content === LAZY;
    }
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
        return tokens[currIndex].content + replaceVars(tokens, lazyVars, currIndex+1, check);
      }
    }
    if (tokens[currIndex].content === DELIMETERS.LEFT_BRACKET) {
      var lastFunctionIndex = lookBackIsFunctionBlock(tokens, currIndex);
      if (lastFunctionIndex > -1) {
        //yes, we're entering a function block
        //ignore everything
        //TODO: this actually isn't that solid. what about variables
        //captured via closure? Those should also be reactive

        return tokens[currIndex].content + replaceVars(tokens, lazyVars, currIndex+1, function(token) {
          return token.content === DELIMETERS.RIGHT_BRACKET;
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
     return token.content === DELIMETERS.SPACE;
    });

    if (lastSpaceIndex > 0) {
      //1 right paren
      var lastRighParenIndex = singleLookBack(tokens, lastSpaceIndex, function(token) {
       return token.content === DELIMETERS.RIGHT_PAREN;
      });

      if (lastRighParenIndex > 0 && lastRighParenIndex !== lastSpaceIndex) {
        var lastParamIndex = lookBackAreParams(tokens, lastRighParenIndex);


        if (lastParamIndex > 0) {
          var lastLeftParenIndex = singleLookBack(tokens, lastParamIndex, function(token) {
           return token.content === DELIMETERS.LEFT_PAREN;
          });


          if (lastLeftParenIndex > 0 && lastLeftParenIndex !== lastRighParenIndex) {
            //check for 0 or 1 chunk, then spaces, then function declaration check
            var optionalSpaceIndex = multipleLookBack(tokens, lastLeftParenIndex, function(token) {
               return token.content === DELIMETERS.SPACE;
            });

            var lastChunkIndex = singleLookBack(tokens, optionalSpaceIndex, function(token) {
               return token.type === CHUNK && token.content !== DECLARATIONS.FUNC_DEC;
            });

            if (lastChunkIndex > 0) {

              var oneOrMoreSpaceIndex = multipleLookBack(tokens, lastChunkIndex, function(token) {
               return token.content === DELIMETERS.SPACE;
              });

              if (oneOrMoreSpaceIndex > 0) {
                var lastFunctionIndex = singleLookBack(tokens, oneOrMoreSpaceIndex, function(token) {
                 return token.content === DECLARATIONS.FUNC_DEC;
                });

                if (lastFunctionIndex !== lastChunkIndex) {
                 return lastFunctionIndex;
                }
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
    return token.content === DELIMETERS.SPACE
   });

   var lastChunkIndex = singleLookBack(tokens, lastSpaceIndex, function(token) {
     return token.type === CHUNK;
   });

  var lastSpaceIndex_2 = multipleLookBack(tokens, lastChunkIndex, function(token) {
    return token.content === DELIMETERS.SPACE
   });

  if (lastSpaceIndex_2 === lastSpaceIndex) {
    //no chunks and checked for spaces and return
    //index after extra spaces
    return lastSpaceIndex_2;
  }

  var lastCommaIndex = singleLookBack(tokens, lastSpaceIndex_2, function(token) {
    return token.content === DELIMETERS.COMMA;
  });

  if (lastCommaIndex !== lastSpaceIndex_2) {
    //there was a comma
    //repeat lookBackParams
    return lookBackAreParams(tokens, lastCommaIndex);
  }

  return lastCommaIndex;
}


function lookBackIsChunk(tokens, currIndex, check) {
   //always only one chunk if exists at all
  if (currIndex > 0 && check(tokens[currIndex-1])) {
    return currIndex-1;
  }
  return currIndex;
}

function lazy(content) {
  content = "/*lazy*/ var x = 9; function add(x, y) {return x+y;}";
  var lazyVars = getLazyVars(content, {});
  var tokens = mainTokenizer(content, 0);
  var newVars = replaceVars(tokens, lazyVars, 0);
  console.log('content', content);
  console.log('newVars', newVars);
}

lazy();

module.exports = lazy;
