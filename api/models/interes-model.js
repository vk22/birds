const mongoose = require('mongoose')
const Schema = mongoose.Schema
const InteresSchema = new Schema({
  num: {
    type: Number
  },
  email: {
    type: String
  },
  order: {
    type: Array
  },
  date: {
    type: Date
  },
  userData: {
    type: Object
  }
})
const InteresModel = mongoose.model('interes', InteresSchema)
module.exports = InteresModel