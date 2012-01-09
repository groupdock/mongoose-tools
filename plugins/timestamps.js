module.exports = function(schema, options) {
  schema.add({
     createdAt: Date,
     updatedAt: Date
  })
  schema.pre('save', function (next) {
    if (this.isNew) {
      if (this.createdAt == null) {
        this.createdAt = new Date
      }
      this.updatedAt = this.createdAt
    } else {
      this.updatedAt = new Date
    }
    next()
  })
}
