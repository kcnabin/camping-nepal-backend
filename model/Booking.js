const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  bookingBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bookingConfirm: Boolean,
  bookedPlace: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  placeName: String,
  placeOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  checkIn: String,
  checkOut: String,
  contactName: String,
  contactNo: String,
  email: String,
  price: Number,
  noOfPeople: Number,
});

module.exports = mongoose.model("Booking", BookingSchema);
