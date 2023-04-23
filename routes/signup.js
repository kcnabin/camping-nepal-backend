const signup = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../model/User')

signup.post('/', async (req, res) => {
  const {fullName, email, password} = req.body

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
    res.status(202).end()

  } catch (e) {
    console.log(e.message);
    res.status(400).json({
      err: 'error creating user'
    })
  }

  
})

module.exports = signup