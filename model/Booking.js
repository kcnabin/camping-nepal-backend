const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  bookingBy: String,
  bookingConfirm: Boolean,
  bookedPlace: String,
  placeOwner: String,
  checkIn: String,
  checkOut: String,
  contactName: String,
  contactNo: Number,
  price: Number,
  placeName: String,
  noOfPeople: Number
})

const Booking = mongoose.model('Booking', BookingSchema)

module.exports = Booking