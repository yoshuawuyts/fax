/**
 * Module dependencies.
 */

var createError = require('http-errors');
var delegate = require('delegates');

/**
 * Prototype.
 */

var proto = module.exports = {

  /**
   * Throw an error with `msg` and optional `status`
   * defaulting to 500. Note that these are user-level
   * errors, and the message may be exposed to the client.
   *
   * @param {String|Number|Error} err, msg or status
   * @param {String|Number|Error} [err, msg or status]
   * @param {Object} [props]
   * @api public
   */

  throw: function() {
    throw createError.apply(null, arguments);
  },
};

/**
 * Request delegation.
 */

delegate(proto, 'request')
  .access('url');

/**
 * Response delegation.
 */

delegate(proto, 'response');
