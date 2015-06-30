var latest;

// Pick latest promise when multiple ones are running
function latestPromise(p) {
  latest = p;

  return latest.then(function pickLatest(myPromise, value) {
    if (myPromise !== latest) {
      // this promise is no longer latest, ignore
      throw new Error('not latest');
    }
  }.bind(null, latest));
}

module.exports = latestPromise;
