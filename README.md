# fax
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

Middleware stack for the client. Leverages ES6 generators. WIP, do not use.
Based off the brilliant work done in [Koa](http://koajs.com).
```
╔═════╗        ╔════════════╗       ╔════════╗       ╔═════════════════╗
║ API ║<──────>║ Middleware ║──────>║ Stores ║──────>║ View Components ║
╚═════╝        ╚════════════╝       ╚════════╝       ╚═════════════════╝
                     ^                                        │
                     │                                        │
               ╔════════════╗                                 │
               ║ Dispatcher ║                                 │
               ╚════════════╝                                 │
                     ^                                        │
                     └────────────────────────────────────────┘
```

## Installation
```bash
$ npm i --save fax
```

## Overview
```js
var logger = require('koa-logger');
var xhr = require('fax-xhr');
var fax = require('fax');

var mw = fax();

// logger

mw.use(logger);

// set `ctx.body`

mw.use(function *(){
  this.body = 'Hello World';
});

// request

mw.use(xhr('localhost:3000'));

// start a request

mw.go(null, function(err, res, body) {
  console.log(body);
});

```

## API
#### mw = fax()
Initialize a new fax instance.
```js
var fax = require('fax');
var mw = fax();
```

#### mw.use(generatorFn)
Attach new middleware to fax. Takes a generator function as an argument.
```js
var logger = require('koa-logger');

// logger

store.use(logger);

// response

store.use(function *(next) {
  this.body = 'Hello World';
});
```

#### mw.go(opts, cb)
Start the middleware and pass it options. Optionally takes a callback that is fired
after every pass through.
```js
var opts = {
  method: 'get',
  name: 'books'
};

// Start the middleware.

mw.go(opts, function(res) {
  console.log(res);
});
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
