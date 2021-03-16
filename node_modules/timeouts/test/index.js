
var test = require('tape')
var Timeouts = require('../')

test('clear one', function(t) {
  t.plan(1)

  var timeouts = Timeouts()
  var tid = timeouts.timeout(t.fail, 100)

  timeouts.clear(tid)
  timeouts.timeout(t.pass, 200)
})

test('clear all', function(t) {
  t.plan(1)

  var timeouts = Timeouts()

  timeouts.timeout(t.fail, 100)
  timeouts.timeout(t.fail, 200)
  timeouts.timeout(t.fail, 300)
  debugger
  timeouts.clearAll()
  timeouts.timeout(t.pass, 400)
})