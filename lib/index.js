/**
 * Module dependencies
 */

var compose = require('koa-compose');
var debug = require('debug')('fax');
var assert = require('assert');
var xhr = require('xhr');
var co = require('co');

var response = require('./response');
var context = require('./context');
var request = require('./request');

/**
 * Store prototype.
 */

var store = Store.prototype;

/**
 * Expose `Store`.
 */

exports = module.exports = Store;

/**
 * Initialize a new `Store`.
 *
 * @api public
 */

function Store() {
  if (!(this instanceof Store)) return new Store;
  this.env = process.env.NODE_ENV || 'development';
  this._middleware = [];
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}

/**
 * Use the given middleware `fn`.
 *
 * @param {GeneratorFunction} fn
 * @return {Application} self
 * @api public
 */

store.use = function(fn) {
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

store.send = function(req) {
  var mw = this._middleware.concat([xhrmw]);
  var gen = compose(mw);
  var fn = co(gen);

  assert(!req || 'object' == typeof req, 'Request should be an object');

  var ctx = this.createContext(req);
  fn.call(ctx);
};

/**
 * Initialize a new context.
 *
 * @api private
 */

store.createContext = function(req) {
  var context = Object.create(this.context);
  var request = context.request = Object.create(this.request);
  var response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req || {};
  context.res = request.res = response.res = {};
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  //context.onerror = context.onerror.bind(context);
  return context;
}

/**
 * XHR middleware.
 */

function *xhrmw(next) {
  if (!this.url) return yield next;

  var opts = {
    url: this.url + this.query,
    body: this.body,
    method: this.method,
    headers: this.headers
  };

  xhr(opts, function(err, res, body) {
    if (err) this.throw(err);
    this.response = res;
    this.body = body;
  }.bind(this));
}
