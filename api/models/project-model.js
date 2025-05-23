const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProjectsSchema = new Schema({
  id: {
    type: Number
  },
  guid: {
    type: String
  },
  url: {
    type: String
  },
  cover: {
    type: String
  },
  preview: {
    type: String
  },
  indexCover: {
    type: String
  },
  gallery: {
    type: Array
  },
  title: {
    type: String
  },
  type: {
    type: String
  },
  class: {
    type: String
  },
  city: {
    type: String
  },
  metro: {
    type: String
  },
  address: {
    type: String
  },
  square: {
    type: Number
  },
  floors: {
    type: String
  },
  parking: {
    type: Number
  },
  freeSpaces: {
    type: Array
  },
  about: {
    type: String
  },
  features: {
    type: Array
  },
  featuresIndex: {
    type: Array
  },
  mapCoords: {
    lat: { type: Number },
    lng: { type: Number }
  },
  pin: {
    type: String
  },
  pdf: {
    type: Array
  },
  apartments: [{
    guid: { type: String },
    number: { type: String },
    type: { type: String },
    section_number: { type: String },
    floor: { type: String },
    floor_number: { type: String },
    own_entrance: { type: Boolean },
    square: { type: Number },
    price: { type: Number },
    status: { type: String },
    project_guid: { type: String },
  }],
  options: {
    type: Array
  },
  project_guid: {
    type: String
  }
})
const ProjectsModel = mongoose.model('projects', ProjectsSchema)
module.exports = ProjectsModel
