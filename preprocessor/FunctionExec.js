"use strict";

function FunctionExec(name, args, content) {
  this.type = "executing function";
  this.name = name;
  this.args = args || [];
  this.closure = [];
  this.content = content;
}

FunctionExec.prototype.name = function(newName) {
  this.name = newName;
};

FunctionExec.prototype.isAnonymous = function() {
  return !!this.name;
};

FunctionExec.prototype.addArgument = function(newArgument) {
  this.args.push(newArgument);
};

FunctionExec.prototype.displayName = "FunctionExec";
FunctionExec.prototype.constructor = FunctionExec;

module.exports = FunctionExec;
