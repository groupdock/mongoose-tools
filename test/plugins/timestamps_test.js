'use strict'

require('sugar')

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var useTimeStamps = require('../../plugins/timestamps')

var assert = require('chai').assert

var Helper = require('../../helpers/index')
var helper = new Helper(mongoose)

mongoose.connect('mongodb://localhost/mongoose-toolbox')

var TimestampTestSchema = new Schema({name: String})
TimestampTestSchema.plugin(useTimeStamps)
var TimestampTest = mongoose.model('TimestampTest', TimestampTestSchema)

describe('timestamps', function() {
  before(function(done) {
    helper.dropCollections(done)
  })
  it('will set createdAt to now', function(done) {
    var timeStampTest = new TimestampTest()
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      var now = Date.create('now')
      assert.ok(timeStampTest.createdAt)
      done()
    })
  })
  it('will set updatedAt to now', function(done) {
    var timeStampTest = new TimestampTest()
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      var now = Date.create('now')
      assert.ok(timeStampTest.updatedAt)
      assert.ok(timeStampTest.updatedAt.is('now', 2000))
      assert.ok(!timeStampTest.updatedAt.is(now.advance(10000), 2000))
      done()
    })
  })
  it('will set updatedAt on change', function(done) {
    var timeStampTest = new TimestampTest()
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      timeStampTest.name = "Test"
      timeStampTest.save(function(err, data) {
        if (err){throw err}

        setTimeout(function() {
          assert.ok(timeStampTest.updatedAt)
          assert.ok(timeStampTest.updatedAt.is('now', 2000))
          done()
        }, 500)
      })
    })
  })
  it('will not change createdAt on change', function(done) {
    var timeStampTest = new TimestampTest()
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      var createdAt = timeStampTest.createdAt
      timeStampTest.name = "Test"
      timeStampTest.save(function(err, data) {
        if (err){throw err}
        setTimeout(function() {
          assert.equal(timeStampTest.createdAt, createdAt)
          done()
        }, 500)
      })
    })
  })
  it('can change createdAt on creation', function(done) {
    var timeStampTest = new TimestampTest()
    var yesterday = Date.create('yesterday')
    timeStampTest.createdAt = yesterday
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      assert.equal(timeStampTest.createdAt, yesterday)
      done()
    })
  })
  it('can retrieve changed createdAt from db', function(done) {
    var timeStampTest = new TimestampTest()
    var yesterday = Date.create('yesterday')
    timeStampTest.createdAt = yesterday
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      assert.equal(data.createdAt, yesterday)
      TimestampTest.findById(timeStampTest._id, function(err, retrievedObject) {
        assert.ok(retrievedObject.createdAt.is(yesterday))
        done()
      })
    })
  })
})
