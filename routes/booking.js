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

booking.get('/:id', decodeToken, async (req, res, next) => {
  const bookingId = req.params.id

  try {
    const bookedPlace = await Booking.findById(bookingId)

    if (!bookedPlace) {
      return next(new Error('Booking not found'))
    }

    if (bookedPlace.bookingBy.toString() !== req.decodedToken.id.toString()) {
      return next(new Error('Not authorized'))
    }

    res.json(bookedPlace)
  
  } catch (e) {
    return next(new Error('Unable to fetch booking') )
  }
  
})

booking.put('/:id', decodeToken, async (req, res, next) => {
  const bookingId = req.params.id
  const bookingToUpdate = req.body

  try {
    const booking = await Booking.findById(bookingId)

    if (!booking) {
      return next(new Error('Booking not found'))
    }

    if (bookingToUpdate.bookingBy.toString() !== req.decodedToken.id.toString()) {
      return next(new Error('Not authorized'))
    }

    await Booking.findByIdAndUpdate(bookingId, bookingToUpdate)
    res.end()

  } catch (e) {
    console.log(e)
    return next(new Error('Unable to update booking!'))
  }

  res.end()

})

booking.delete('/:id', decodeToken, async (req, res, next) => {
  const {decodedToken} = req
  const bookingId = req.params.id

  try {
    const bookingToDelete = await Booking.findById(bookingId)

    if (!bookingToDelete) {
      return next(new Error('Booking not found'))
    }

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