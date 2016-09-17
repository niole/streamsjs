/* main */
var stream = require('../app/Streams.js');
var assert = require('assert');

var array = stream.array;
var range = stream.range;
var callbackWithRange = stream.callbackWithRange;

describe('Streams', function() {
  describe('#array', function() {
    it('should return the subsequent element in declaration on every call', function() {
      var first = 1;
      var second = 2;
      var third = 3;

      var a = array(first, second, third);

      assert.equal(a(), first, "should equal first");
      assert.equal(a(), second, "should equal second");
      assert.equal(a(), third, "should equal third");
    });
  });


});
