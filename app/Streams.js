/*
 *a library that makes javascript arrays into lazy streams
 */

'use strict';

function array() {
  var a = arguments;
  var index = -1;
  return function() {
    index += 1;
    return a[index];
  };
}

function internalRange(start, end, step) {
  step = step || 1;
  var index = start - step;

  return function(nextIndex) {
    if (!nextIndex) {
        if (index + step < end) {
          index += step;
        }
        return index;
    }

    return nextIndex*step;
  };
}

function callbackWithRange(rangeStart, rangeEnd, step, cb) {
  var r = internalRange(rangeStart, rangeEnd, step);
  return function(nextIndex) {
    return cb(r(nextIndex));
  };
}

module.exports = {
  array: array,
  callbackWithRange: callbackWithRange
};
