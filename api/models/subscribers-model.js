const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const SubscribesSchema = new Schema({
  email: {
    type: String
  },
  updated: {
    type: Array
  }
})
const SubscribesModel = mongoose.model('subscribes', SubscribesSchema)
module.exports = SubscribesModel