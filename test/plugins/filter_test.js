'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var filter = require('../../plugins/filter')

var _ = require('underscore')

var Faker = require('Faker')
var assert = require('assert')

mongoose.connect('mongodb://localhost/mongoose-toolbox')

var Helper = require('../../helpers/index')
var helper = new Helper(mongoose)

describe('filter plugin', function() {
  var DummyModel
  var whitelist = [
    'publicProp1',
    'publicProp2',
    'publicProp3',
    'publicProp4'
  ]
  before(function(done) {
    mongoose.connect('mongodb://localhost/mongoose-toolbox')
    helper.dropCollections(done)
  })
  after(function(done) {
    helper.dropCollections(done)
  })
  before(function() {
    var dummySchema = new Schema({
      publicProp1: String,
      publicProp2: String,
      publicProp3: String,
      publicProp4: String,
      privateProp1: String,
      privateProp2: String,
      privateProp3: String,
      privateProp4: String
    })
    dummySchema.plugin(filter(whitelist))
    DummyModel = mongoose.model('DummyMoodel', dummySchema)
  })
  it('can get a list of whitelisted properties', function() {
    assert.equal(DummyModel.whitelist(), whitelist)
  })
  it('will filter out private properties', function() {
    var dummy = new DummyModel({
      publicProp1: Faker.Lorem.words().pop(),
      publicProp2: Faker.Lorem.words().pop(),
      publicProp3: Faker.Lorem.words().pop(),
      publicProp4: Faker.Lorem.words().pop(),
      privateProp1: Faker.Lorem.words().pop(),
      privateProp2: Faker.Lorem.words().pop(),
      privateProp3: Faker.Lorem.words().pop(),
      privateProp4: Faker.Lorem.words().pop()
    })
    assert.deepEqual(_.keys(dummy.filter()), whitelist)
  })
})


