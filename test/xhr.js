/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var fax = require('../lib/index');

/**
 * Test
 */

describe('xhr', function() {
  it('should assert argument types', function() {
    var store = fax();
    store.use(function *() {
      this.url = 'localhost:3000';
      this.method = 'POST';
      this.body = JSON.stringify({foo: 'bar'});
    })
  });
});
