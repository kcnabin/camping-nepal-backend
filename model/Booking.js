const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  bookingBy: String,
  bookingConfirm: Boolean,
  bookedPlace: String,
  placeOwner: String,
  checkIn: Date,
  checkOut: Date,
  contactName: String,
  contactNo: Number

})

const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking