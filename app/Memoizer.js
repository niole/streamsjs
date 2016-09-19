"use strict";
/*memoizes all calls*/

function Memoizer() {
  this._saved = {};
}

Memoizer.prototype.memoize = function(boundMethod, args) {
  if (args) {
      var serializedArgs = JSON.stringify(args);
      var savedResult = this._saved[serializedArgs];
      if (savedResult) {
        return savedResult;
      }

      this._saved[serializedArgs] = boundMethod();
      return this._saved[serializedArgs];
  }

  return boundMethod();
};

Memoizer.displayName = "Memoizer";
Memoizer.prototype.constructor = Memoizer;
module.exports = Memoizer;
