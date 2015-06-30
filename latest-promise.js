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
