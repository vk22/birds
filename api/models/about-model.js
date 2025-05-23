const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AboutSchema = new Schema({
  indexText: {
    type: String
  },
  aboutText: {
    type: String
  },
  aboutTopPhrase: {
    type: String
  },
  indexImage: {
    type: String
  }
})
const AboutModel = mongoose.model('about', AboutSchema)
module.exports = AboutModel