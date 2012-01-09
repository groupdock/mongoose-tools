var Helpers = require('./helpers')

module.exports = function(mongoose) {
  exports.helpers = new Helpers(mongoose)
  exports.plugins = {}
  exports.plugins.timestamps = require('./plugins/timestamps')
  return exports
}

