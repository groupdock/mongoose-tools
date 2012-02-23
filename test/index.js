var assert = require('assert')

describe('module', function() {
  var mockMongoose = {}
  it('module is an object', function() {
    assert.ok(typeof require('../index') === 'object')
  })
  it('helpers is a function', function() {
    assert.ok(typeof require('../index').helpers === 'function')
  })
  it('module exposes correct helper methods', function() {
    var mongooseHelpers = require('../index').helpers(mockMongoose)
    assert.ok(mongooseHelpers)
    assert.ok(typeof mongooseHelpers.dropCollections === 'function')
  })
  it('module exposes correct plugins', function() {
    var mongooseTools = require('../index')
    assert.ok(mongooseTools.plugins)
    assert.ok(mongooseTools.plugins.timestamps)
  })
  it('passes mongoose to helper', function() {
    var mongooseHelpers = require('../index').helpers(mockMongoose)
    assert.equal(mongooseHelpers.mongoose, mockMongoose)
  })
})
