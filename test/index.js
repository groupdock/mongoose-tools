var assert = require('chai').assert

suite('module', function() {
  var mockMongoose = {}
  test('module is a function', function() {
    assert.isFunction(require('../index'))
  })
  test('module exposes correct helper methods', function() {
    var mongooseTools = require('../index')(mockMongoose)
    assert.ok(mongooseTools.helpers)
    assert.isFunction(mongooseTools.helpers.dropCollections)
  })
  test('module exposes correct plugins', function() {
    var mongooseTools = require('../index')(mockMongoose)
    assert.ok(mongooseTools.plugins)
    assert.ok(mongooseTools.plugins.timestamps)
  })
  test('passes mongoose to helper', function() {
    var mongooseTools = require('../index')(mockMongoose)
    assert.equal(mongooseTools.helpers.mongoose, mockMongoose)
  })
})
