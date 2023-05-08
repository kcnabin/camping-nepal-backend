const decodeToken = require('../middleware/decodeToken')
const doesPlaceExist = require('../middleware/doesPlaceExist')
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
    return next(e)
  }
})

places.get('/', decodeToken, async (req, res, next) => {
  const {decodedToken} = req

  try {
    const myPlaces = await Place.find({owner: decodedToken.id})
    
    res.json(myPlaces)

  } catch (e) {
    return next(e)
  }
})

places.get('/all', decodeToken, async (req, res, next) => {
  const {id} = req.decodedToken
  try {
    const allPlaces = await Place.find({})
    const otherPlaces = allPlaces.filter(place => place.owner.toString() !== id.toString())
    
    res.json(otherPlaces)

  } catch (e) {
    return next(e)

  }
})

places.get('/:id', decodeToken, doesPlaceExist, async (req, res, next) => {
  const placeId = req.params.id

  const onePlace = await Place.findById(placeId)
  
  res.json(onePlace)

})

places.put('/:id', decodeToken, async (req, res, next) => {
  const placeId = req.params.id
  const placeToUpdate = req.body
  const { decodedToken } = req

  if (decodedToken.id.toString() !== placeToUpdate.owner.toString()) {
    return next(new Error('Not authorized to update'))
  }

  try {
    const updatedPlace = await Place.findByIdAndUpdate(placeId, placeToUpdate)
    res.json(updatedPlace)

  } catch (e) {
    return next(e)
  }
  
})

places.delete('/:id', decodeToken, async (req, res, next) => {
  const placeId = req.params.id
  const placeToUpdate = await Place.findById(placeId)
  const { decodedToken } = req

  if (decodedToken.id.toString() !== placeToUpdate.owner.toString()) {
    return next(new Error('Not authorized to delete'))
  }

  try {
    await Place.findByIdAndDelete(placeId)
    res.end()

  } catch (e) {
    return next(e)
  }
  
})

module.exports = places