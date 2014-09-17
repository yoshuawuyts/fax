/**
 * Module dependencies
 */

var compose = require('koa-compose');
var assert = require('assert');
var debug = require('debug');
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
 * Return a request handler callback
 * for node's native http server.
 *
 * @return {Function}
 * @api public
 */

store.callback = function(req, cb){
  var mw = [respond].concat(this._middleware);
  var gen = compose(mw);
  var fn = co(gen);

  var ctx = this.createContext(req, cb);
  fn.call(ctx);
};

/**
 * Start listening.
 */

store.go = function(req, cb) {
  assert('object' == typeof req, 'Request should be an object');
  cb = cb || function() {};
  this.callback(req, cb);
}

/**
 * Initialize a new context.
 *
 * @api private
 */

store.createContext = function(req, cb) {
  var context = Object.create(this.context);
  var request = context.request = Object.create(this.request);
  var response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = {};
  context._cb = request._cb = response._cb = cb;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  //context.onerror = context.onerror.bind(context);
  return context;
}

/**
 * Response middleware.
 */

function *respond(next) {
  yield next;
  this._cb(this.res);
}
