(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.latestPromise = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var latest;
var OBSOLETE_MESSAGE = 'promise is obsolete';

// Pick latest promise when multiple ones are running
function latestPromise(p) {
  if (typeof p !== 'object') {
    throw new Error('Expected a promise object');
  }
  if (typeof p.then !== 'function') {
    throw new Error('Expected a promise object with .then method');
  }

  latest = p;

  return latest.then(function pickLatest(myPromise, value) {
    if (myPromise !== latest) {
      // this promise is no longer latest, ignore
      // console.log('throwing', OBSOLETE_MESSAGE, 'instead of', value);
      throw OBSOLETE_MESSAGE;
    }
    return value;
  }.bind(null, latest));
}

latestPromise.wasObsolete = function wasObsolete(err) {
  if (typeof err === 'string') {
    return err === OBSOLETE_MESSAGE;
  }
  return err && err.reason === OBSOLETE_MESSAGE;
};

module.exports = latestPromise;

},{}]},{},[1])(1)
});