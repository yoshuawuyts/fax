/**
 * Module dependencies.
 */

var fax = require('../../')

/**
 * Test.
 */

describe('ctx.onerror(err)', function() {
  it('should assert argument types', function(done) {
    var app = fax();

    app.use(function *() {
      try {
        this.onerror('foo');
      } catch(e) {
        e.message.should.eql('non-error thrown: foo');
        done();
      }
    });

    app.send();
  });

  it('should do nothing if no err is passed', function(done) {
    var app = fax();
    var called = false;

    app.use(function *() {
      try {
        this.onerror();
      } catch(e) {
        called = true;
      }
      called.should.eql(false);
      done();
    });

    app.send();
  });

  it('should emit an error', function(done) {
    var app = fax();

    app.on('error', function() {
      done();
    });

    app.use(function *() {
      this.onerror(new Error('boom'));
    });

    app.send();
  });
});
