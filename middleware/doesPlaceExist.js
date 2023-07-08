const Place = require("../model/Place");

const doesPlaceExist = async (req, res, next) => {
  const placeId = req.params.id;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return next(new Error("Place doesnot exist!"));
    }
    req.place = place;

    next();
  } catch (e) {
    return next(e);
  }
};

module.exports = doesPlaceExist;
