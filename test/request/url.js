/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var fax = require('../../lib/index');

/**
 * Test
 */

describe('ctx.url()', function() {
  it('should set an url', function(done) {
    var store = fax();
    store.use(function *(next){
      this.req.url.should.eql('foo');
      yield next;
      this.req.url.should.eql('bar');
    });

    store.use(function *(next){
      this.req.url = 'bar';
      yield next;
    });

    store.go({url: 'foo'}, function() {done()});
  });
});
