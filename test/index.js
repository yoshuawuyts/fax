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

    store.go({}, function(){});
  });
});

describe('.go', function() {
  it('should assert argument types');
  it('should correctly execute middleware', function(done) {
    var store = fax();

    store.use(function *(next) {
      this.req.count += 1;
      yield next;
      this.res.count += 1;
    });

    store.use(function *(next) {
      this.res.count = this.req.count;
      yield next;
    });

    store.go({count: 1}, function(res) {
      res.count.should.eql(3);
      done();
    });
  });
});
