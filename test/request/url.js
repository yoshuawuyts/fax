/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var context = require('../context');

/**
 * Test
 */

describe('ctx.url()', function() {
  it('should set an url', function() {
    var ctx = context();
    ctx.url = 'foo';
    ctx.url.should.eql('foo');
  });
});
