# latest-promise

> Pick latest promise when multiple ones are running

[![Circle CI](https://circleci.com/gh/bahmutov/latest-promise.svg?style=svg)](https://circleci.com/gh/bahmutov/latest-promise)

    npm install --save latest-promise

Then pass each promise through the exported function. All but latest promise will be rejected,
you can check if the rejection is due to being obsolete

```js
var pickLatest = require('latest-promise');
var first = pickLatest(makeSlow());
var second = pickLatest(makeFast());
// first promise takes a long time to finish, while second is quick
// second promise has valid value, but the first one gets rejected
first.catch(function (err) {
    if (pickLatest.wasObsolete(err)) {
        // well, this promise finished AFTER second
        // and should be ignored
    }
});
```

## Small print

Author: Gleb Bahmutov &copy; 2015
[@bahmutov](https://twitter.com/bahmutov) [glebbahmutov.com](http://glebbahmutov.com)
[glebbahmutov.com/blog](http://glebbahmutov.com/blog)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open issue on Github
