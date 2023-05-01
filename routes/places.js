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

places.get('/all', decodeToken, async (req, res) => {
  const {id} = req.decodedToken
  try {
    const allPlaces = await Place.find({})
    const otherPlaces = allPlaces.filter(place => place.owner.toString() !== id.toString())
    
    res.json(otherPlaces)
    // res.json(allPlaces)

  } catch (e) {
    console.log(e)
    return next(new Error('Unable to fetch ALL places'))

  }
})

places.get('/:id', async (req, res, next) => {
  const placeId = req.params.id

  try {
    const onePlace = await Place.findById(placeId)
    
    res.json(onePlace)

  } catch (e) {
    console.log(e)
    return next(new Error('Unable to fetch one place'))

  }
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
    console.log('Place updated')
    res.json(updatedPlace)

  } catch (e) {
    console.log(e)
    return next(new Error('Error updating place'))
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
    console.log('Place deleted!')
    res.end()

  } catch (e) {
    console.log(e)
    return next(new Error('Error deleting place'))
  }
  
})

module.exports = places