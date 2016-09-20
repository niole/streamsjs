var assert = require('assert');
var mainTokenizer = require("../preprocessor/tokenizer.js");

describe('tokenizer', function() {
  var c1 =
    "if (test(chr)) { "+
      "acc += chr; "+
      "return lookAhead(content, currIndex+1, acc, test); "+
    "} "+
    "return { "+
      "acc: acc, "+
      "lastPassingIndex: currIndex-1, "+
    "}; ";

  var c2 =
  "function has(x,y, cb) {"+
    "const times = x* y ;"+
    "/*lazy*/ let _div_Y1 = times/y;"+
    "return cb(_div_Y1);"+
  "}"+
  "console.log(has(101, 33, function(res) {"+
    'return res+"look";'+
  "}));";

  var c3 =
  "var dynamicVar = 1 + 2;"+
  "var thisIsAnObject = {"+
    "[dynamicVar]: true,"+
    "notDynamic: false"+
  "};"+
  "thisIsAnObject.12";

  it("aggregate tokens' content should equal original string - 1", function() {
    var output = mainTokenizer(c1, 0, []);
    var concatenated = output.map(function(token) {
      return token.content;
    }).join("");

    assert.equal(c1, concatenated, "no data should be lost during tokenization");
  });

  it("aggregate tokens' content should equal original string - 2", function() {
    var output = mainTokenizer(c2, 0, []);
    var concatenated = output.map(function(token) {
      return token.content;
    }).join("");

    assert.equal(c2, concatenated, "no data should be lost during tokenization");
  });

  it("aggregate tokens' content should equal original string - 3", function() {
    var output = mainTokenizer(c3, 0, []);
    var concatenated = output.map(function(token) {
      return token.content;
    }).join("");

    assert.equal(c3, concatenated, "no data should be lost during tokenization");
  });
});
