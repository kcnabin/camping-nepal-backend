const mongoose = require('mongoose')

const PlaceSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  photos: {type: Array},
  descriptions: {type: String},
  facilities: {type: Array},
  guestsNum: {type: Number},
  price: {type: Number, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Place = mongoose.model('Place', PlaceSchema)
module.exports = Place