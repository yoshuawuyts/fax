/**
 * Module dependencies
 */

var Emitter = require('events').EventEmitter;
var compose = require('koa-compose');
var debug = require('debug')('fax');
var qs = require('querystring');
var assert = require('assert');
var xhr = require('xhr');
var co = require('co');

var response = require('./response');
var context = require('./context');
var request = require('./request');

/**
 * Store prototype.
 */

var app = Application.prototype;

/**
 * Expose `Store`.
 */

exports = module.exports = Application;

/**
 * Initialize a new `Store`.
 *
 * @api public
 */

function Application() {
  if (!(this instanceof Application)) return new Application;
  this.env = process.env.NODE_ENV || 'development';
  this._middleware = [];
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}

/**
 * Inherit from `Emitter.prototype`.
 */

Application.prototype.__proto__ = Emitter.prototype;

/**
 * Use the given middleware `fn`.
 *
 * @param {GeneratorFunction} fn
 * @return {Application} self
 * @api public
 */

app.use = function(fn) {
  assert(fn && 'GeneratorFunction' == fn.constructor.name, 'app.use() requires a generator function');
  debug('use %s', fn._name || fn.name || '-');
  this._middleware.push(fn);
  return this;
};

/**
 * Start the whole shebang.
 *
 * @return {Function}
 * @api public
 */

app.send = function(req) {
  var mw = this._middleware.concat([xhrmw]);
  var gen = compose(mw);
  var fn = co(gen);

  assert(!req || 'object' == typeof req, 'Request should be an object');

  if (!this.listeners('error').length) this.on('error', this.onerror);

  var ctx = this.createContext(req);
  fn.call(ctx);
};

/**
 * Initialize a new context.
 *
 * @api private
 */

app.createContext = function(req) {
  var context = Object.create(this.context);
  var request = context.request = Object.create(this.request);
  var response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req || {};
  context.res = request.res = response.res = {};
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.onerror = context.onerror.bind(context);
  return context;
}

/**
 * Default error handler.
 *
 * @param {Error} err
 * @api private
 */

app.onerror = function(err){
  assert(err instanceof Error, 'non-error thrown: ' + err);

  if (404 == err.status) return;
  if ('test' == this.env) return;

  var msg = err.stack || err.toString();
  console.error();
  console.error(msg.replace(/^/gm, '  '));
  console.error();
};

/**
 * XHR middleware.
 */

function *xhrmw(next) {
  if (!this.url) return yield next;

  var opts = {
    url: this.url + qs.stringify(this.query),
    body: this.body,
    method: this.method,
    headers: this.headers
  };

  var thunk = xhr.bind(null, opts);
  var response = yield thunk;

  var res = response[0];
  if (res instanceof Error) throw res;

  this.lastModified = res.headers.lastModified;
  this.type = res.responseType;
  this.headers = res.headers;
  this.status = res.status;
  this.body = res.body;
  this.url = res.url;

  yield next;
}
