require('lazy-ass');
var check = require('check-more-types');

describe('pick-latest', function () {
  var pickLatest = require('..');

  it('is a function', function () {
    la(check.fn(pickLatest));
  });
});
