const decodeToken = require('../middleware/decodeToken')
const Place = require('../model/Place')
const places = require('express').Router()

places.post('/', decodeToken, async (req, res, next) => {
  const {decodedToken} = req
  
  const placeData = {
    ...req.body,
    owner: decodedToken.id
  }

  try {
    const placeToSave = new Place(placeData)
    const savedPlace = await placeToSave.save()
    res.status(202).json(savedPlace)

  } catch (e) {
    console.log(e)
    return next(new Error('Error saving new place'))
  }
})

places.get('/', decodeToken, async (req, res, next) => {
  const {decodedToken} = req

  try {
    const myPlaces = await Place.find({owner: decodedToken.id})
    
    res.json(myPlaces)

  } catch (e) {
    console.log(e)
    return next(new Error('Unable to fetch user places'))

  }
})

places.get('/all', async (req, res) => {
  try {
    const allPlaces = await Place.find({})
    
    res.json(allPlaces)

  } catch (e) {
    console.log(e)
    return next(new Error('Unable to fetch ALL places'))

  }
})

module.exports = places