const mongoose = require('mongoose')
const Schema = mongoose.Schema
const PromoSchema = new Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String
  },
  date_start: {
    type: Date
  },
  date_end: {
    type: Date
  },
  no_terms: {
    type: Boolean
  },
  description: {
    type: String
  },
  cover: {
    type: String
  },
  gallery: {
    type: Array
  },
  updated: {
    type: Date
  },
  checkedProjects: {
    type: Array
  },
  checkedRent: {
    type: Array
  },
  link: {
    type: String
  },
})
const PromoModel = mongoose.model('promos', PromoSchema)
module.exports = PromoModel