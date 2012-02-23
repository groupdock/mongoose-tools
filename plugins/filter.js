module.exports = function filter(whitelist) {
  return function filter(schema) {
    schema.method('filter', function(callback) {
      var result = {}
      for (var i = 0; i < whitelist.length; i++) {
        var key = whitelist[i]
        result[key] = this[key]
      }
      return result
    })
    schema.static('whitelist', function() {
      return whitelist
    })
  }
}
