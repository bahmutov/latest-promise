require('lazy-ass');
var check = require('check-more-types');
var Q = require('q');

function makeDelayed(delay, value) {
  la(check.number(delay), 'expected a delay number', delay);
  return Q.delay(delay).then(function () {
    return value;
  });
}

var makeFast = makeDelayed.bind(null, 5, 'fast');
var makeSlow = makeDelayed.bind(null, 25, 'slow');

function verifyValue(expected, val) {
  la(val === expected, 'expected', expected, 'got', val);
}

var verify42 = verifyValue.bind(null, 42);
var verifyFast = verifyValue.bind(null, 'fast');
var verifySlow = verifyValue.bind(null, 'slow');


describe('pick-latest', function () {
  var pickLatest = require('../latest-promise');

  function verifyObsolete(promiseResult) {
    la(promiseResult, 'missing result');
    if (check.object(promiseResult)) {
      la(promiseResult.state === 'rejected');
    }
    la(pickLatest.wasObsolete(promiseResult));
  }

  describe('misc specs', function () {
    it('delays a promise', function () {
      var p = makeDelayed(25, 42);
      return p;
    });

    it('delays a promise and checks resolved value', function () {
      return makeDelayed(25, 42)
        .then(verify42);
    });
  });

  it('is a function', function () {
    la(check.fn(pickLatest));
  });

  it('has helper method for detecting obsolete', function () {
    la(check.fn(pickLatest.wasObsolete));
  });

  it('can resolve a single value', function () {
    var p = makeDelayed(25, 42);
    return pickLatest(p).then(verify42);
  });

  it('fast and slow resolve', function () {
    var fast = makeFast();
    var slow = makeSlow();
    return Q.all([fast, slow])
      .spread(verifyFast, verifySlow);
  });

  it('second wins, first is fast, but is obsolete', function () {
    var first = pickLatest(makeFast());
    var second = pickLatest(makeSlow());
    return Q.allSettled([first, second])
      .spread(verifyObsolete, verifySlow);
  });

  it('second wins, first is slow and obsolete', function () {
    var first = pickLatest(makeSlow());
    var second = pickLatest(makeFast());
    return Q.allSettled([first, second])
      .spread(verifyObsolete, verifyFast);
  });

  it('can be verified manually', function (done) {
    var first = pickLatest(makeSlow());
    var second = pickLatest(makeFast());

    first.then(function (result) {
      console.log('first promise (slow) result', result);
    }, function (err) {
      console.log('first promise (slow) error', err);
      verifyObsolete(err);
      done();
    }).done();

    second.then(function (result) {
      console.log('second promise (fast) result', result);
      verifyFast(result);
    }).catch(function (err) {
      console.error(err);
      throw err;
    }).done();

  });

});
