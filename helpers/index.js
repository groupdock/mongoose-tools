var async = require('async')
var mongoose = require('mongoose')
var _ = require('underscore')

exports.dropCollections = function(callback) {
  var collections = _.keys(mongoose.connection.collections)
  async.forEach(collections, function(collectionName, done) {
    var collection = mongoose.connection.collections[collectionName]
    collection.drop(function(err) {
      if (err && err.message != 'ns not found') done(err)
      done(null)
    })
  }, callback)
}
