const context    = require('../context').context
const test       = require('tape')
const proxyquire = require('proxyquire')

const err = false
const fax = proxyquire('../lib/index', {
  xhr: xhrStub,
  '@noCallThru': true
})

/**
 * Mock `xhr()` in `fax()`.
 */

function xhrStub(opts, cb) {
  if (err) return cb('boom', 'foo', 'bar');
  cb(null, {
    headers: {},
    body: 'foo'
  }, 'bar');
}

// afterEach(function() {
//   err = false;
// });



//
// describe('xhr', function() {
//   it('should perform an xhr request', function() {
//     var app = fax();
//
//     app.use(function *(next) {
//       this.url = 'localhost:3000';
//       yield next;
//     });
//
//     app.send();
//   });
//
//   it('should handle xhr errors', function(done) {
//     var app = fax();
//     err = true;
//
//     app.use(function *(next) {
//       try {
//         yield next;
//       } catch(e) {
//         e.should.eql('boom')
//         done();
//       }
//     });
//
//     app.use(function *(next) {
//       this.url = 'localhost:3000';
//       yield next;
//     });
//
//     app.send(app);
//   });
//
//   it('should halt execution until the request completes');
// });
