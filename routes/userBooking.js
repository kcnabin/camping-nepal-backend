const decodeToken = require('../middleware/decodeToken')
const Booking = require('../model/Booking')

const userBooking = require('express').Router()

userBooking.get('/', decodeToken, async (req, res, next) => {
  const {decodedToken} = req

  try {
    const bookingByUser = await Booking.find({placeOwner: decodedToken.id})
    res.json(bookingByUser)

  } catch (e) {
    return next(new Error('Unable to fetch user boooking'))
  }
})

userBooking.put('/confirm/:id', decodeToken, async (req, res, next) => {
  const {decodedToken} = req
  const bookingId = req.params.id

  try {
    const bookingToConfirm = await Booking.findById(bookingId)

    if (bookingToConfirm.placeOwner.toString() !== decodedToken.id.toString()) {
      return next(new Error('Not authorized'))

    } else {
      await Booking.findByIdAndUpdate(bookingId, {bookingConfirm: true})
      console.log('Booking confirmed!')
      res.end()
    }
  } catch (e) {
    return next(new Error('Unable to confirm booking'))
  }
})

module.exports = userBooking