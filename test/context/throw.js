
const context = require('../context').context
const test    = require('tape')

test('ctx.throw() should throw an error', function(t) {
  t.plan(1)
  const ctx = context()
  t.throws(ctx.throw.bind(ctx, 'boom'), 'boom')
})
