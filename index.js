var Helpers = require('./helpers')

exports.helpers = function(mongoose) {
  return new Helpers(mongoose)
}

exports.plugins = {}
exports.plugins.timestamps = require('./plugins/timestamps')
exports.plugins.filter = require('./plugins/filter')

