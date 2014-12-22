/*eslint no-unused-expressions: 0*/

var stderr = require('test-console').stderr;
var fax = require('../');
var assert = require('assert');
var AssertionError = assert.AssertionError;

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

describe('app.onerror(err)', function() {
  it('should throw an error if a non-error is given', function() {
    var app = fax();

    try {
      app.onerror('foo');
      should.fail();
    } catch (err) {
      err.should.be.instanceOf(AssertionError);
      err.message.should.equal('non-error thrown: foo');
    }
  });

  it('should do nothing if status is 404', function() {
    var app = fax();
    var err = new Error();

    err.status = 404;

    var output = stderr.inspectSync(function() {
      app.onerror(err);
    });

    output.should.eql([]);
  })

  it('should do nothing if env is test', function() {
    var app = fax();
    var err = new Error();

    var output = stderr.inspectSync(function() {
      app.onerror(err);
    });

    output.should.eql([]);
  })

  it('should log the error to stderr', function() {
    var app = fax();
    app.env = 'dev';

    var err = new Error();
    err.stack = 'Foo';

    var output = stderr.inspectSync(function() {
      app.onerror(err);
    });

    output.should.eql(["\n", "  Foo\n", "\n"]);
  })
});
