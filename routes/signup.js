const signup = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/User')

signup.post('/', async (req, res, next) => {
  const {fullName, email, password} = req.body

  try {
    const user = await User.findOne({email})
    
    if (user) {
      next(new Error('User already in database'))
    }

  } catch (e) {
    next(new Error('Can not connect to database'))
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const userObject = {
    fullName, 
    email, 
    passwordHash
  }

  try {
    const newUser = new User(userObject)
    await newUser.save()

    res.status(202).json({
      msg: 'new user created'
    })

  } catch (e) {
    return next(e)
  }
  
})

module.exports = signup