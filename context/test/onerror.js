
const test = require('tape')
const fax = require('../../')

/**
 * Test.
 */

test('ctx.onerror(err) should assert argument types', function(t) {
  t.plan(1)
  var app = fax()

  app.use(function *() {
    // try {
    //   this.onerror('foo')
    // } catch(e) {
    //   t.equal(e.message, /non-error/)
    // }
    // t.throws(this.throw.bind(this, 'foo'), 'non-error thrown: foo')
  })

  app.send()
})
//
//   it('should do nothing if no err is passed', function(done) {
//     const app = fax()
//     const called = false
//
//     app.use(function *() {
//       try {
//         this.onerror()
//       } catch(e) {
//         called = true
//       }
//       called.should.eql(false)
//       done()
//     })
//
//     app.send()
//   })
//
//   it('should emit an error', function(done) {
//     const app = fax()
//
//     app.on('error', function() {
//       done()
//     })
//
//     app.use(function *() {
//       this.onerror(new Error('boom'))
//     })
//
//     app.send()
//   })
// })
