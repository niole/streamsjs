"use strict";
var lazy = require("./lazyTransformerGuts.js");

module.exports = function(content) {
  lazy();
  return content;
};
