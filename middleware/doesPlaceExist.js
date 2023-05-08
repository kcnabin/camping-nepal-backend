const Place = require("../model/Place")

const doesPlaceExist = async (req, res, next) => {
  const placeId = req.params.id

  try {
    const fetchedPlace = await Place.findById(placeId)

    if (!fetchedPlace) {
      return next(new Error('Place doesnot exist!'))
    } 
    next()
  
  } catch (e) {
    return next(e)
  }
}

module.exports = doesPlaceExist