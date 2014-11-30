/**
 * Module dependencies.
 */


var stringify = require('url').format;
var typer = require('media-typer');
var parse = require('parseurl');
var qs = require('querystring');
var fresh = require('fresh');

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
  },

  /**
   * Get request method.
   *
   * @return {String}
   * @api public
   */

  get method() {
    return this.req.method;
  },

  /**
   * Set request method.
   *
   * @param {String} val
   * @api public
   */

  set method(val) {
    this.req.method = val;
  },

  /**
   * Get request pathname.
   *
   * @return {String}
   * @api public
   */

  get path() {
    return parse(this.req).pathname;
  },

  /**
   * Set pathname, retaining the query-string when present.
   *
   * @param {String} path
   * @api public
   */

  set path(path) {
    var url = parse(this.req);
    url.pathname = path;
    this.url = stringify(url);
  },

  /**
   * Get parsed query-string.
   *
   * @return {Object}
   * @api public
   */

  get query() {
    var str = this.querystring;
    if (!str) return {};

    var c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
  },

  /**
   * Set query-string as an object.
   *
   * @param {Object} obj
   * @api public
   */

  set query(obj) {
    this.querystring = qs.stringify(obj);
  },

  /**
   * Get query string.
   *
   * @return {String}
   * @api public
   */

  get querystring() {
    return parse(this.req).query || '';
  },

  /**
   * Set querystring.
   *
   * @param {String} str
   * @api public
   */

  set querystring(str) {
    var url = parse(this.req);
    url.search = str;
    this.url = stringify(url);
  },

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
      return this.res.setHeader(field, val);
    }

    for (var key in field) this.set(key, field[key]);
  },

  /**
  * Remove header `field`.
  *
  * @param {String} name
  * @api public
  */

  remove: function(field){
    this.res.removeHeader(field);
  }
};
