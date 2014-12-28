
const window = require('global/window')
const test   = require('tape')

require('6to5/polyfill')

require('./test/context/onerror')
require('./test/context/throw')
require('./test/request/url')

test('shutdown', function(t) {
  window.close()
  t.end()
})
