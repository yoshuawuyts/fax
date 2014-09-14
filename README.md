# fax
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Middleware stack for the client. Leverages ES6 generators. WIP, do not use.
Based off the brilliant work done in [Koa](koajs.com).


## Installation
```bash
$ npm i --save fax
```

## Overview
```js
var fax = require('fax');

var store = fax();

store.use(function *(next) {
  // get stuff from a db
});

```

## API
#### store = fax()
Initialize a new fax instance.
```js
var fax = require('fax');
var store = fax();
```

#### store.use(generatorFn)
Attach new middleware to fax.
```js
store.use(function *(next) {

});
```

#### store.start()
Start listening for new events.
```js
store.start();
```

## License
[MIT](https://tldrlegal.com/license/mit-license) ©
[Yoshua Wuyts](yoshuawuyts.com)

[npm-image]: https://img.shields.io/npm/v/fax.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fax
[travis-image]: https://img.shields.io/travis/yoshuawuyts/fax.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/fax
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/fax.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/fax?branch=master
