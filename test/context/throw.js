/**
 * Module dependencies.
 */

var fax = require('../../')

/**
 * Test.
 */

describe('ctx.throw(err)', function() {
  it('should throw an error', function(done) {
    var app = fax();

    app.use(function *() {
      try {
        this.throw('boom');
      } catch(e) {
        e.message.should.eql('boom');
        done();
      }
    });

    app.send();
  });
});
