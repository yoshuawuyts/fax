/**
 * Module dependencies.
 */

/**
 * Prototype.
 */

module.exports = {

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
};
