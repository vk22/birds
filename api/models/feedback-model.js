const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const FeedbacksSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  message: {
    type: String
  },
  date: {
    type: Date
  },
  userData: {
    type: Object
  },
  pageFrom: {
    type: String
  }
})
const FeedbacksModel = mongoose.model('feedbacks', FeedbacksSchema)
module.exports = FeedbacksModel