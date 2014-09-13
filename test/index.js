/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var fax = require('../lib/index');

/**
 * Test
 */

describe('fax()', function() {
  it('should do awesome things!', function() {
    var store = fax();
    var i = 0;
    store.use(function *() {
      i = 2;
    });

    store.start();
    i.should.eql(2);
  });
});
