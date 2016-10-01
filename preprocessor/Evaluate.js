"use strict";
var Parsed = require("./Parsed.js");

function Evaluate() {
  this.args = [];
}

Evaluate.prototype = Parsed.prototype;

Evaluate.prototype.formatLazyVar = function(lazyVar) {
  return lazyVar+"()";
};

Evaluate.prototype.evaluate = function(lazyVarMap) {
  this.args = this.args.map(function(parseable) {
    if (lazyVarMap[parseable.content]) {
      parseable.content = this.formatLazyVar(parseable.content);
    }
    return parseable;
  });
};

Evaluate.prototype.displayName = "Evaluate";
Evaluate.prototype.constructor = Evaluate;

module.exports = Evaluate;
