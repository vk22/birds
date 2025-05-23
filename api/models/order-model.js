const mongoose = require('mongoose')
const Schema = mongoose.Schema
const OrdersSchema = new Schema({
  num: {
    type: Number
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
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
const OrdersModel = mongoose.model('orders', OrdersSchema)
module.exports = OrdersModel