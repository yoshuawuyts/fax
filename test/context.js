var fax = require('..')

exports = module.exports = function(opts, cb) {
  return fax().createContext(opts, cb);
}

exports.context = function(opts, cb) {
  return exports(opts, cb);
}

exports.request = function(opts, cb) {
  return exports(opts, cb).request;
}

exports.response = function(opts, cb) {
  return exports(opts, cb).response;
}
