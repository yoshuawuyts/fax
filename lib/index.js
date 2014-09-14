/**
 * Module dependencies
 */

var compose = require('koa-compose');
var assert = require('assert');
var debug = require('debug');
var co = require('co');

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
 * Return a request handler callback
 * for node's native http server.
 *
 * @return {Function}
 * @api public
 */

store.callback = function(){
  var mw = this._middleware;
  var gen = compose(mw);
  var fn = co(gen);

  fn();
};

/**
 * Start listening.
 */

store.start = function() {
  this.callback();
}
