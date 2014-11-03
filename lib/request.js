/**
 * Module dependencies.
 */

var parse = require('parseurl');

/**
 * Prototype.
 */

module.exports = {

  /**
   * Get response body.
   *
   * @return {Mixed}
   * @api public
   */

  get body() {
    return this._body;
  },

  /**
   * Set response body.
   *
   * @param {Mixed} val
   * @api public
   */

  set body(val) {
    var original = this._body;
    this._body = val;
  },

  /**
   * Get request URL.
   */

  get url() {
    return this.req.url;
  },

  /**
   * Set request URL.
   */

  set url(val) {
    this.req.url = val;
  }

  /**
   * Set
   */
};
