/* main */
'use strict';

var streams = require('./Streams.js');
var range = require('./Range.js');

var array = streams.array;
var callbackWithRange = streams.callbackWithRange;

/*lazy*/var a = array(1,2,3,4,5,6);

console.log('array', a);
console.log('array', a);

/*lazy*/var cb = callbackWithRange(0, 10, 1, function(x) { return x*x; });
console.log('callbackWithRange', cb);
console.log('callbackWithRange', cb);

/*lazy*/var r = range(0, 1000).with(function(x) { return x+1; });
console.log('range', r);
console.log('range', r);
