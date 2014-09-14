/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var fax = require('../lib/index');

/**
 * Test
 */

describe('fax()', function() {
  it('should assert argument types', function() {
    var store = fax();
    store.use.bind(store, function(){})
      .should.throw('app.use() requires a generator function');
  });
});

describe('.use()', function() {
  it('should chain middleware', function() {
    var store = fax();
    var i = 0;

    store.use(function *(next) {
      i += 2;
      yield next;
      i.should.eql(4);
    });

    store.use(function *() {
      i += 2;
    });

    store.start();
  });
});

describe('.start', function() {
  it('should accept arguments');
});
