
const context = require('../context').context
const test    = require('tape')

test('ctx.onerror() should assert arg types', function(t) {
  t.plan(1)
  const ctx = context()
  t.throws(ctx.onerror.bind(ctx, 'foo'), /non-error thrown/)
})

test('ctx.onerror() should do nothing if no err is passed', function(t) {
  t.plan(1)
  const ctx = context()
  t.equal(ctx.onerror(), undefined)
})

test('ctx.onerror() should emit an error', function(t) {
  t.plan(1)
  const ctx = context()
  ctx.app.on('error', function(err) {
    t.ok(err.message, 'boom', 'err msg')
  })
  ctx.onerror(new Error('boom'))
})
