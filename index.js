const Emitter = require('events').EventEmitter
const debug   = require('debug')('fax')
const compose = require('koa-compose')
const qs      = require('querystring')
const assert  = require('assert')
const xhr     = require('xhr')
const co      = require('co')

const response = require('./response')
const context  = require('./context')
const request  = require('./request')

// Prototype.
var app = Application.prototype

// Expose `prototype`.
exports = module.exports = Application

// Initialize a new `Application`
function Application() {
  if (!(this instanceof Application)) return new Application
  this.env = process.env.NODE_ENV || 'development'
  this._middleware = []
  this.context     = Object.create(context)
  this.request     = Object.create(request)
  this.response    = Object.create(response)
}

// Inherit from `Emitter.prototype`.
Application.prototype.__proto__ = Emitter.prototype

// Use the given middleware `fn`.
// @param {GeneratorFunction} fn
// @return {this}
app.use = function(fn) {
  assert.ok(fn)
  assert.equals(fn.constructor.name, 'GeneratorFunction')

  debug('use %s', fn._name || fn.name || '-')
  this._middleware.push(fn)
  return this
}

// Start the whole shebang
// @return {Function}
app.send = function(req) {
  var mw  = this._middleware.concat([xhrmw])
  var gen = compose(mw)
  var fn  = co(gen)

  assert(!req || 'object' == typeof req, 'Request should be an object')

  if (!this.listeners('error').length) this.on('error', this.onerror)

  var ctx = this.createContext(req)
  fn.call(ctx)
}

// Initialize a new context.
// @param {Object} req
app.createContext = function(req) {
  req         = req || {}
  req.method  = req.method || 'GET'
  req.headers = req.headers || {}
  req.url     = req.url || ''

  assert('object' == typeof req, 'fax: req should be an object')

  var context  = Object.create(this.context)
  var request  = context.request  = Object.create(this.request)
  var response = context.response = Object.create(this.response)

  context.app = request.app  = response.app = this
  context.req = request.req  = response.req = req
  context.res = request.res  = response.res = {}
  request.ctx = response.ctx = context

  request.response = response
  response.request = request

  context.originalUrl = request.originalUrl = req.url
  context.onerror     = context.onerror.bind(context)

  return context
}

// Default error handler.
// @param {Error} err
app.onerror = function(err) {
  assert(err instanceof Error, 'non-error thrown: ' + err)

  if (404 == err.status) return
  if ('test' == this.env) return

  var msg = err.stack || err.toString()
  console.error()
  console.error(msg.replace(/^/gm, '  '))
  console.error()
}
