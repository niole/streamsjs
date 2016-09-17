/*
 *Range class
 */
'use strict';

var streams = require('./Streams.js');
var callbackWithRange = streams.callbackWithRange;

function Range(start, end, step) {
  this._rangeStart = start;
  this._rangeEnd = end;
  this._step = step;
}

Range.prototype._callbackWithRange = callbackWithRange;

Range.prototype.with = function(callback) {
  return this._callbackWithRange(this._rangeStart, this._rangeEnd, this._step, callback);
};

Range.displayName = "Range";
Range.prototype.constructor = Range;

function range(start, end, step) {
  return new Range(start, end, step);
};

module.exports = range;
