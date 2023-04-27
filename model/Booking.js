const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  bookingBy: String,
  bookedPlace: String,
  placeOwner: String,
  checkIn: String,
  checkOut: String,
  bookingConfirm: Boolean
})

const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking