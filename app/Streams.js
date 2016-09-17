/*
 *a library that makes javascript arrays into lazy streams
 *
 */

function array() {
  var a = arguments;
  var index = -1;
  return function() {
    index += 1;
    return a[index];
  };
}

function range(start, end, step) {
  step = step || 1;
  var index = start - 1;

  return function() {
    if (index + step < end) {
      index += step;
    }
    return index;
  };
}

function callbackWithRange(rangeStart, rangeEnd, step, cb) {
  var r = range(rangeStart, rangeEnd, step);
  return function() {
    return cb(r());
  };
}

module.exports = {
  array: array,
  range: range,
  callbackWithRange: callbackWithRange
};
