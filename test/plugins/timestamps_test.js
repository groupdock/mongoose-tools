'use strict'

require('sugar')

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var useTimeStamps = require('../../plugins/timestamps')
var h = require('../../helpers')
var assert = require('chai').assert

mongoose.connect('mongodb://localhost/mongoose-toolbox')

var TimestampTestSchema = new Schema({name: String})
TimestampTestSchema.plugin(useTimeStamps)
var TimestampTest = mongoose.model('TimestampTest', TimestampTestSchema)

suite('timestamps', function() {
  setup(function(done) {
    h.dropCollections(done)
  })
  test('will set createdAt to now', function(done) {
    var timeStampTest = new TimestampTest()
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      var now = Date.create('now')
      assert.ok(timeStampTest.createdAt)
      done()
    })
  })
  test('will set updatedAt to now', function(done) {
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
  test('will set updatedAt on change', function(done) {
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
  test('will not change createdAt on change', function(done) {
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
  test('can change createdAt on creation', function(done) {
    var timeStampTest = new TimestampTest()
    var yesterday = Date.create('yesterday')
    timeStampTest.createdAt = yesterday
    timeStampTest.save(function(err, data) {
      if (err){throw err}
      assert.equal(timeStampTest.createdAt, yesterday)
      done()
    })
  })
  test('can retrieve changed createdAt from db', function(done) {
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
