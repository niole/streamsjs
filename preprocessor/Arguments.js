"use strict";

function Arguments(args) {
  this.type = "arguments";
  this.args = args || [];
}

Arguments.prototype.addArg = function(newArg) {
  this.args.push(newArg);
};

Arguments.prototype.constructor = Arguments;
Arguments.prototype.displayName = "Arguments";

module.exports = Arguments;
