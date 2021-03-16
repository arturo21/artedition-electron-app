
module.exports = function() {
  var timeouts = {}
  var id = 0
  var manager = {
    timeout: function(fn, millis) {
      if (arguments.length > 2) throw new Error('parameters to timed out function are not supported yet')

      var tid = id++
      var args = [].slice.call(arguments)
      args[0] = function() {
        delete timeouts[tid]
        fn()
      }

      var timeout = setTimeout.apply(global, args)
      timeouts[tid] = timeout
      return tid
    },

    clear: function(tid) {
      clearTimeout(timeouts[tid])
      delete timeouts[tid]
    },

    clearAll: function() {
      for (var tid in timeouts) {
        manager.clear(tid)
      }
    }
  }

  return manager
}
