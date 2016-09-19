"use strict";
var constants = require("./JSConstants.js");

var IS_VAR = constants.IS_VAR;
var LAZY_VAR_PATTERN = constants.LAZY_VAR_PATTERN;
var EQUALS = constants.EQUALS;
var LAZY = constants.LAZY;


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
          lazyVars[userDefinedVar] = true;
        }
    }
    return getLazyVars(content.slice(nextEquals+1), lazyVars);
  }

  return lazyVars;
}
module.exports = getLazyVars;
