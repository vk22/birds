const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CategorySchema = new Schema({
  id: {
    type: String
  },
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  url: {
    type: String
  },
  image: {
    type: String
  },
  subcategories: {
    type: Array
  },
})
const CategoryModel = mongoose.model('categories', CategorySchema)
module.exports = CategoryModel