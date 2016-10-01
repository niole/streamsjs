function Parseable(type, content, args, scopedVariables, toFind) {
  this.type = type;
  this.content = content;
  this.args = args || [];
  this.scopedVariables = scopedVariables || [];
  this.toFind = toFind || [];
}

Parseable.prototype.ofGroup = function(types) { return types[this.content]; }
Parseable.prototype.equals = function(other) { return this.content === other; }
Parseable.prototype.equalsType = function(otherType) { return this.type === otherType; }
Parseable.prototype.ofType = function(type) { return this.type === type; }
Parseable.prototype.setContent = function(newContent) { this.content = newContent; }
Parseable.prototype.updateContent = function(newContent) { this.content += newContent; }
Parseable.prototype.setType = function(newType) { this.type = newType; }
Parseable.prototype.addArgs = function(newArguments) { this.args = this.args.concat(newArguments); }
Parseable.prototype.addScopedVars = function(newVars) { this.scopedVariables = this.scopedVariables.concat(newVars); }
Parseable.prototype.addToFind = function(toFind) {
  if (toFind.length) {
    //TODO need better check for array
    this.toFind = this.toFind.concat(toFind);
  } else {
    this.toFind.push(toFind);
  }
}
Parseable.prototype.nextToFind = function() {
  return this.toFind.pop();
}
Parseable.prototype.getLast = function(potentialMatch, remove) {
  if (this.toFind.length) {
    if (remove) {
      return this.toFind.pop();
    }
    return this.toFind[this.toFind.length-1];
  }
  return false;
}

Parseable.prototype.isMatching = function(potentialMatch) {
  var last = this.toFind[this.toFind.length-1];
  var isMatch = last === potentialMatch;
  //todo probably want to do more than this
  return isMatch;
}
Parseable.prototype.constructor = Parseable;
Parseable.prototype.displayName = "Parseable";

module.exports = Parseable;
