"use strict";
var constants = require("./constants.js");

var DELIMETERS = constants.DELIMETERS;
var DELIMETER_TYPE = constants.DELIMETER_TYPE;
var CHUNK = constants.CHUNK;

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

module.exports = mainTokenizer;
