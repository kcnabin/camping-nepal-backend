const User = require('../model/User')
const login = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

login.post('/', async (req, res, next) => {
  const {email, password} = req.body

  try {
    const user = await User.findOne({email})

    if (!user) {
      return next(new Error(`User doesn't exist in database`))
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)
    if (!isPasswordCorrect) {
      return next(new Error('Incorrect Password'))
    }

    const token = await jwt.sign(
      {id: user._id.toString(), name: user.fullName},
      process.env.SECRET_KEY,
      {expiresIn: 360000}
    )

    console.log(`user '${user.fullName}' logged in`)

    res.json({
      token,
      name: user.fullName
    })

  } catch (e) {
    return next(new Error(`Can't connect to database`))
  }

})

module.exports = login