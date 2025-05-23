const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId
const LotsSchema = new Schema({
  guid: {
    type: String
  },
  project: {
    guid: { type: String },
    title: { type: String },
  },
  metro: {
    type: String
  },
  project_title: {
    type: String
  },
  project_guid: {
    type: String
  },
  number: {
    type: String
  },
  type: {
    type: String
  },
  subType: {
    type: String
  },
  planType: {
    type: String
  },
  section_number: {
    type: String
  },
  floor_number: {
    type: String
  },
  own_entrance: {
    type: Boolean
  },
  finishing: {
    type: String
  },
  furniture: {
    type: String
  },
  square: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  },
  status: {
    type: String
  },
  cover: {
    type: String
  },
  gallery: {
    type: Array
  },
  gallery_fake: {
    type: Array
  },
  about: {
    type: String
  },
  options: {
    type: Array
  },
})
const LotsModel = mongoose.model('lots', LotsSchema)
module.exports = LotsModel



