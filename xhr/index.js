const xhr = require('xhr')

module.exports = xhrmw

// XHR middleware.
// @param {Function} next
function *xhrmw(next) {
  if (!this.url) return yield next

  var opts = {
    url     : this.url,
    body    : this.body,
    method  : this.method,
    headers : this.headers,
  }

  var thunk    = xhr.bind(null, opts)
  var response = yield thunk

  var res = response[0]
  if (res instanceof Error) throw res

  var keys = Object.keys(res)
  keys.forEach(function(key) {
    this.res[key] = res[key]
  })

  yield next
}
