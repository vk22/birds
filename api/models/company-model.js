const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CompanySchema = new Schema({
  phone: {
    type: String
  },
  address: {
    type: String
  },
  emailFrom: {
    type: String
  },
  emailTo: {
    type: String
  },
  emailsForOrders: {
    type: Array
  },
  contacts: [{
    id: {
      type: Number
    },
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
  }]
})
const CompanyModel = mongoose.model('company', CompanySchema)
module.exports = CompanyModel