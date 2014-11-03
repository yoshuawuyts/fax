# fax
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

Middleware stack for the client leveraging ES6 generators.
Based off the brilliant work done in [Koa](http://koajs.com).

Having a middleware stack in the client is not as strange as
it might first seem. Like on the server there's a need to perform multiple
layers of processing before a request is made. With Fax you can now just as
easily compose your complete stack in the browser as you would on the server,
building on the familiar API Koa provides.

In order to run `fax` in today's browsers you need to provide a
[setimmediate][setimmediate] shim. To run generators in the browser it's recommended to use [koaify][koaify] and [browserify][browserify].

## Installation
```sh
npm install fax
```

## Usage
```js
var logger = require('fax-logger');
var fax = require('fax');
var app = fax();

app.use(logger());
app.use(function *(next) {
  this.url = 'http://mysite.com';
  this.body = 'Hello World';
  yield next;
});

app.send();
```

## API
#### var app = fax()
Initialize a new fax instance.
```js
var fax = require('fax');
var app = fax();
```

#### app.use(generatorFn)
Attach new middleware to fax. Takes a generator function as an argument.
```js
app.use(function *(next) {
  this.body = 'Hello World';
});
```

#### app.send(opts)
Run the middleware with given options.
```js
app.send({
  method: 'get',
  url: '/books'
});
```

## See also
- [koa](http://koajs.com) (this project is 90% koa code)

## Links
- [Roadmap]()
- [Wiki]()

## License
[MIT](https://tldrlegal.com/license/mit-license)

[npm-image]: https://img.shields.io/npm/v/fax.svg?style=flat-square
[npm-url]: https://npmjs.org/package/fax
[travis-image]: https://img.shields.io/travis/yoshuawuyts/fax.svg?style=flat-square
[travis-url]: https://travis-ci.org/yoshuawuyts/fax
[coveralls-image]: https://img.shields.io/coveralls/yoshuawuyts/fax.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yoshuawuyts/fax?branch=master
[downloads-image]: http://img.shields.io/npm/dm/fax.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/fax

[setimmediate]: http://ghub.io/setimmediate
[koaify]: https://github.com/yoshuawuyts/koaify
[browserify]: https://github.com/substack/node-browserify
