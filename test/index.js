/*eslint no-unused-expressions: 0*/

/**
 * Module dependencies
 */

var fax = require('../lib/index');

/**
 * Test
 */

describe('app = fax()', function() {
  it('should assert argument types', function() {
    var app = fax();
    app.use.bind(app, function(){})
      .should.throw('app.use() requires a generator function');
  });
});

describe('app.use()', function() {
  it('should chain middleware', function() {
    var app = fax();
    var i = 0;

    app.use(function *(next) {
      i += 2;
      yield next;
      i.should.eql(4);
    });
    app.use(function *(next) {
      i += 2;
    });

    app.send();
  });
});

describe('app.send()', function() {
  it('should assert argument types', function() {
    var app = fax();

    app.send.bind(app, 'asdf')
      .should.throw('Request should be an object');

    app.send.bind(app, {})
      .should.not.throw();
  });

  it('should correctly execute middleware', function(done) {
    var app = fax();

    app.use(function *(next) {
      this.req.count += 1;
      yield next;
      this.res.count += 1;
      this.res.count.should.eql(3);
      done();
    });

    app.use(function *(next) {
      this.res.count = this.req.count;
      yield next;
    });

    app.send({count: 1});
  });
});
