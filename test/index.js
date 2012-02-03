var assert = require('assert')



suite('module', function() {
  var mockMongoose = {}
  test('module is an object', function() {
    assert.ok(typeof require('../index') === 'object')
  })
  test('helpers is a function', function() {
    assert.ok(typeof require('../index').helpers === 'function')
  })
  test('module exposes correct helper methods', function() {
    var mongooseHelpers = require('../index').helpers(mockMongoose)
    assert.ok(mongooseHelpers)
    assert.ok(typeof mongooseHelpers.dropCollections === 'function')
  })
  test('module exposes correct plugins', function() {
    var mongooseTools = require('../index')
    assert.ok(mongooseTools.plugins)
    assert.ok(mongooseTools.plugins.timestamps)
  })
  test('passes mongoose to helper', function() {
    var mongooseHelpers = require('../index').helpers(mockMongoose)
    assert.equal(mongooseHelpers.mongoose, mockMongoose)
  })
})
