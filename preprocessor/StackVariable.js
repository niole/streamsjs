"use strict";

function StackVariable(type, content) {
  this.type = type;
  this.content = content;
}
StackVariable.prototype.getType = function() { return this.type; }
StackVariable.prototype.getContent = function() { return this.content; }
StackVariable.prototype.constructor = StackVariable;
StackVariable.prototype.displayName = "StackVariable";

module.exports = StackVariable;
