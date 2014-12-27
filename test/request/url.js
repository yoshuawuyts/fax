
const context = require('../context').context
const test    = require('tape')

test('ctx.url() should set an url', function(t) {
  t.plan(1)
  const ctx = context()
  ctx.url = 'foo'
  t.equal(ctx.url, 'foo')
})
