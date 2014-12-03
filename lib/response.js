/**
 * Module dependencies.
 */

/**
 * Prototype.
 */

module.exports = {

  /**
   * Get status.
   */

  get status() {
    return this.res.status;
  },

  /**
   * Message.
   *
   * todo: write a module to unwrap the statusText.
   */

  get message() {
    return this.res.statusText
  },

  /**
   * Return the request mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    var type = this.get('Content-Type');
    if (!type) return;
    return type.split(';')[0];
  },

  /**
   * Return request header.
   *
   * @return {Object}
   * @api public
   */

  get header() {
    return this.res.headers;
  },

  /**
   * Return request header, alias as request.header
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.res.headers;
  },

  /**
   * Last modified.
   */

  /**
   * Etag.
   */

  /**
   * Return response header.
   *
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   *     this.get('Something');
   *     // => undefined
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get: function(field){
    var req = this.req;

    switch (field = field.toLowerCase()) {
      case 'referer':
      case 'referrer':
        return req.headers.referrer || req.headers.referer;

      default:
        return req.headers[field];
    }
  }
};
