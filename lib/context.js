/**
 * Module dependencies.
 */

var delegate = require('delegates');

/**
 * Prototype.
 */

var proto = module.exports = {

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
