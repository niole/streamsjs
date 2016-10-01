"use strict";
var Parseable = require("./Parseable.js");

function Parsed() {
  this.env = []; //declarations in current environment
  this.declarations = {};
  this.parsed = []; //stack of Parseable
}

Parsed.prototype.updateEnv = function(newVar) {
    this.env.push(newVar);
};

Parsed.prototype.last = function() {
  //TODO should clone this before returning
  return this.parsed[this.parsed.length-1];
}
Parsed.prototype.updateLast = function(opts) {
  var type = opts.type;
  var content = opts.content;
  var args = opts.args;
  var scopedVariables = opts.scopedVariables;
  var toFind = opts.toFind;
  var last = this.last();

  if (type) {
    last.setType(type);
  }

  if (content) {
    last.updateContent(content);
  }

  if (args) {
    last.addArgs(args);
  }

  if (scopedVariables) {
    last.addScopedVars(scopedVariables);
  }

  if (toFind) {
    last.addToFind(toFind);
  }
}

Parsed.prototype.squashLastWith = function(nextParseable, newType) {
  var last = this.parsed.pop();
  newType = newType || last.type; //default to last type if none provided
  var next;

  if (last) {
    next =
      new Parseable(
        newType,
        last.content+nextParseable.content,
        last.args.concat(nextParseable.args),
        last.scopedVariables.concat(nextParseable.scopedVariables),
        last.toFind.concat(nextParseable.concat)
    );
  } else {
    next =
      new Parseable(
        newType,
        nextParseable.content,
        nextParseable.args,
        nextParseable.scopedVariables,
        nextParseable.concat
    );
  }

  this.parsed.push(next);
  return next;
}

Parsed.prototype.updateParsed = function(nextParsed) {
  this.parsed.push(nextParsed);
};

Parsed.prototype.constructor = Parsed;
Parsed.prototype.displayName = "Parsed";

module.exports = Parsed;
