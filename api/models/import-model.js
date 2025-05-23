const mongoose = require('mongoose')
const Schema = mongoose.Schema
const importSchema = new Schema({
  totalCount: {
    type: Number
  },
  data: {
    type: Array
  },
  date: {
    type: Date
  },
  status: {
    type: String
  }
})
const importModel = mongoose.model('Import', importSchema)
module.exports = importModel

