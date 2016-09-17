/* main */
var stream = require('./Streams.js');

var array = stream.array;
var range = stream.range;
var callbackWithRange = stream.callbackWithRange;

var a = array(1,2,3,4,5,6);

console.log('array', a());
console.log('array', a());
console.log('array', a());
console.log('array', a());

var r = range(0, 1000);

console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());
console.log('range', r());

var cb = callbackWithRange(0, 10, 1, function (x) { return x*x; });
console.log('callbackWithRange', cb());
console.log('callbackWithRange', cb());
console.log('callbackWithRange', cb());
console.log('callbackWithRange', cb());
console.log('callbackWithRange', cb());
