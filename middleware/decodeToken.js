const { getTokenFromRequest } = require("../helper/getTokenFromRequest")
const SECRET_KEY = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')

const decodeToken = async (req, res, next) => {
  const token = getTokenFromRequest(req)

  if (!token) {
    return next(new Error('token not found'))
  }

  try {
    const decodedToken = await jwt.verify(token, SECRET_KEY)
    req.decodedToken = decodedToken
    next()  

  } catch (e) {
    return next(e)
  }
}

module.exports = decodeToken