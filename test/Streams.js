var stream = require('../app/Streams.js');
var assert = require('assert');

var array = stream.array;
var callbackWithRange = stream.callbackWithRange;

describe('Streams', function() {
  describe('#array', function() {
    var first = 1;
    var second = 2;
    var third = 3;
    var a = array(first, second, third);

    it('first call should return first', function() {
      assert.equal(a(), first, "should equal first");
    });

    it('second call should return second', function() {
      assert.equal(a(), second, "should equal second");
    });

    it('third call should return third', function() {
      assert.equal(a(), third, "should equal third");
    });
  });

  describe('#callbackWithRange 0 - 10, step: 1', function() {
    var r1 = [0, 10, 1];
    var cb1 = function (x) {
      return x*3;
    };

    var a = callbackWithRange(r1[0], r1[1], r1[2], cb1);

    it("first call should be 0", function() {
      assert.equal(a(), 0, "result should be 0");
    });

    it("second call should be 3", function() {
      assert.equal(a(), 3, "result should be 3");
    });

    it("third call should be 6", function() {
      assert.equal(a(), 6, "result should be 6");
    });
  });

  describe('#callbackWithRange 0 - 10, step: 3', function() {
    var r2 = [0, 10, 3];
    var cb2 = function (x) {
      return x*3;
    };
    var b = callbackWithRange(r2[0], r2[1], r2[2], cb2);

    it("first call should be 0", function() {
      assert.equal(b(), 0, "result should be 0");
    });

    it("second call should be 9", function() {
      assert.equal(b(), 9, "result should be 9");
    });

    it("third call should be 18", function() {
      assert.equal(b(), 18, "result should be 18");
    });
  });
});
