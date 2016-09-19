"use strict";
var lazy = require("./preprocessor/lazyTransformerPreProcessor.js");

module.exports = function(content) {
  lazy();
  return content;
};
