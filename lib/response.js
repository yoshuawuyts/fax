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
   * Last modified.
   */

  /**
   * Etag.
   */

  /**
   * Return response header.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get: function(field){
    return this.header[field.toLowerCase()];
  },

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   *
   * @param {String|Object|Array} field
   * @param {String} val
   * @api public
   */

  set: function(field, val){
    if (2 == arguments.length) {
      if (Array.isArray(val)) val = val.map(String);
      else val = String(val);
      this.res.setHeader(field, val);
    } else {
      for (var key in field) {
        this.set(key, field[key]);
      }
    }
  },
};
