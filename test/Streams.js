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

  describe('#callbackWithRange', function() {
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
});
