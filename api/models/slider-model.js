const mongoose = require('mongoose')
const Schema = mongoose.Schema
const SliderSchema = new Schema({
  mainPhrase: {
    type: String
  },
  phrases: {
    type: Array
  },
  imageBackground: {
    type: String
  }
})
const SliderModel = mongoose.model('slider', SliderSchema)
module.exports = SliderModel