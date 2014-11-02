/**
 * Module dependencies.
 */

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
  }
};
