const decodeToken = require('../middleware/decodeToken')
const Booking = require('../model/Booking')

const booking = require('express').Router()

booking.post('/', decodeToken, async (req, res, next) => {
  const bookingObject = req.body
  const {decodedToken} = req

  try {
    const placeToBeBooked = new Booking({
      ...bookingObject,
      bookingBy: decodedToken.id,
      bookingConfirm: false
    })
    const savedBooking = await placeToBeBooked.save()
    res.json(savedBooking)

  } catch (e) {
    return next(new Error('Unable to book place'))
  }
})

booking.get('/', decodeToken, async (req, res, next) => {
  const {decodedToken} = req

  try {
    const myBooking = await Booking.find({bookingBy: decodedToken.id})
    res.json(myBooking)
    
  } catch (e) {
    return next(new Error('Unable to fetch booking'))
  }
})

booking.delete('/:id', decodeToken, async (req, res, next) => {
  const {decodedToken} = req
  const bookingId = req.params.id

  try {
    const bookingToDelete = await Booking.findById(bookingId)
    if (bookingToDelete.bookingBy.toString() !== decodedToken.id.toString()) {
      return next(new Error('Not authorized'))

    } else {
        await Booking.findByIdAndDelete(bookingId)
        console.log('booking deleted')
        res.end()
    }

  } catch (e) {
      return next(new Error('Unable to delete booking'))
  }
})

module.exports = booking