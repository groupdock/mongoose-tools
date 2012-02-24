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
  var DummyModel, dummySchema
  var whitelist, blacklist


  before(function(done) {
    mongoose.connect('mongodb://localhost/mongoose-toolbox')
    helper.dropCollections(done)
  })
  after(function(done) {
    helper.dropCollections(done)
  })
  beforeEach(function() {
    whitelist = [
      'publicProp1',
      'publicProp2',
      'publicProp3',
      'publicProp4'
    ]
    blacklist = [
      'privateProp1',
      'privateProp2',
      'privateProp3',
      'privateProp4'
    ]
    dummySchema = new Schema({
      publicProp1: String,
      publicProp2: String,
      publicProp3: String,
      publicProp4: String,
      privateProp1: String,
      privateProp2: String,
      privateProp3: String,
      privateProp4: String
    })
  })
  describe('whitelist', function() {
    beforeEach(function() {
      dummySchema.plugin(filter.in(whitelist))
      DummyModel = mongoose.model('DummyModel', dummySchema)
    })
    it('can get a list of whitelisted properties', function() {
      assert.deepEqual(DummyModel.whitelist(), whitelist)
      assert.strictEqual(DummyModel.blacklist(), null)
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
  describe('blacklist', function() {
    before(function() {
      dummySchema.plugin(filter.out(blacklist))
      DummyModel = mongoose.model('DummyModel2', dummySchema)
    })
    it('can get a list of filtered properties', function() {
      assert.deepEqual(DummyModel.blacklist(), blacklist)
      assert.strictEqual(DummyModel.whitelist(), null)
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
      whitelist.push('_id')
      assert.deepEqual(_.keys(dummy.filter()), whitelist)
    })
  })

})


