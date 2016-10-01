"use strict";

var assert = require('assert');
var parse = require('../preprocessor/parser.js');
describe('parser', function() {
  describe('parse', function() {
    var c1 = "function() {}";

    it('can parse a function into a FunctionDec', function () {
      var res = parse(c1);
      console.log("RESULT", res);
      assert.isTrue(res.type === "function", "the type is a function");
    });
  });
});
