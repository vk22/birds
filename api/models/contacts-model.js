const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ContactsSchema = new Schema({
  city: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  mapCoords: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
})
const ContactsModel = mongoose.model('contacts', ContactsSchema)
module.exports = ContactsModel