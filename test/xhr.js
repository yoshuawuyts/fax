/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var proxyquire = require('proxyquire');
var fax = proxyquire('../lib/index', {xhr: xhrStub, '@noCallThru': true});
var errMsg = null;
var err = false;

/**
 * Mock `xhr()` in `fax()`.
 */

function xhrStub(opts, cb) {
  if (err) {
    try {
      return cb('boom');
    } catch(e) {
      errMsg = e;
    }
  }
  cb();
}

afterEach(function() {
  err = false;
  errMsg = null;
});

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

  it('should handle xhr errors', function() {
    var app = fax();
    err = true;

    app.use(function *(next) {
      this.url = 'localhost:3000';
      yield next;
    });

    app.send(app);
    errMsg.message.should.eql('boom');
  });
});
