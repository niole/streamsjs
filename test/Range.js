var range = require('../app/Range.js');
var assert = require('assert');

describe('Range', function() {
  describe('#range', function() {
    var a = [0, 10];
    var b = [0, 10, 3];
    var c = [0, 10, 2];
    var r1 = range(a[0], a[1]).with(function(x) { return x+2; });
    var r2 = range(b[0], b[1], b[2]).with(function(x) { return x+2; });
    var r3 = range(b[0], b[1], b[2]).with(function(x) { return x+2; });
    var rc = range(c[0], c[1], c[2]).with(function(x) { return x*2; });

    it('step defaults to 1', function () {
      var c1 = r1();
      var c2 = r1();

      assert.equal(c2-c1, 1, "step should default to 1");
    })

    it('implements correct step with callback', function () {
      var c1 = r2();
      var c2 = r2();
      assert.equal(c2-c1, 3, "step is 3");
    })

    it('will never generate element from index not in range', function () {
      r3();
      r3();
      r3();
      r3();
      r3();
      r3();
      var shouldBe11 = r3();
      assert.equal(shouldBe11, 11, "last returned value should be 11");
    })

    it('can access whatever element in range', function () {
      assert.equal(rc(2), 8, "last returned value should be 8");
    })
  })
});
