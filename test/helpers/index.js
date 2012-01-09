var assert = require('chai').assert
var mongoose = require('mongoose')
var async = require('async')

var Helper = require('../../helpers/index')
var helper = new Helper(mongoose)

suite('helper', function() {
  setup(function(done) {
    mongoose.connect('mongodb://localhost/mongoose-tools')
    done()
  })
  teardown(function(done) {
    helper.dropCollections(done)
  })
  suite('dropCollections', function() {
    var testSchema, testModels, testCollections
    var NUM_COLLECTIONS = 5
    var NUM_DATAS = 5

    setup(function(done) {
      testModels = []
      testCollections = []
      testSchema = new mongoose.Schema({
        name: String
      })
      for (var i = 0; i < NUM_COLLECTIONS; i++) {
        var Model = mongoose.model('TestModel' + i, testSchema)
        testCollections.push(Model)

        // save some datas
        for (var j = 0; j < NUM_DATAS; j++) {
          var data = new Model({name: 'model ' + j})
          testModels.push(data)
        }
      }
      async.forEach(testModels, function(model, callback) {
        model.save(callback)
      }, function() {
        done()
      })
    })
    test('will drop collections', function(done) {
      helper.dropCollections(function() {
        async.forEach(testCollections, function(collection, callback) {
          collection.count(function(err, count) {
            assert.ok(!err)
            assert.equal(count, 0)
            callback()
          })
        }, function(err) {
          assert.ok(!err)
          done()
        })
      })
    })
  })
})
