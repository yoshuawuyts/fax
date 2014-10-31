/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var proxyquire = require('proxyquire');

/**
 * Mock `xhr()` in `fax()`.
 */

var fax = proxyquire('../lib/index', {xhr: xhrStub, '@noCallThru': true});
function xhrStub(opts, cb) {
  console.log(cb());
}

/**
 * Test
 */

describe('xhr', function() {
  it('should perform an xhr request', function() {
    var app = fax();
    app.use(function *(next) {
      this.url = 'localhost:3000';
      yield next;
    });
    app.send();
  });

  it('should handle xhr errors');
});
