"use strict";

function FunctionDec(name, args, content) {
  this.type = "function";
  this.name = name;
  this.args = args || [];
  this.closure = [];
  this.content = content;
  this.block = null;
}

FunctionDec.prototype.updateBlock = function(block) {
  this.block = block;
};

FunctionDec.prototype.name = function(newName) {
  this.name = newName;
};

FunctionDec.prototype.isAnonymous = function() {
  return !!this.name;
};

FunctionDec.prototype.addArgument = function(newArgument) {
  this.args.push(newArgument);
};

FunctionDec.prototype.displayName = "FunctionDec";
FunctionDec.prototype.constructor = FunctionDec;

module.exports = FunctionDec;
