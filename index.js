require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const signup = require('./routes/signup')
const getTokenFromRequest = require('./helper/getTokenFromRequest').getTokenFromRequest
const mongoose = require('mongoose')

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())

try {
  const connectToDB = async () => {
    await mongoose.connect(MONGO_URL)
    console.log('--Connected to DB--')
  }
  connectToDB()

} catch (e) {
  console.log('--Error connecting to DB--')
}

const logger = (req, res, next) => {
  console.log(`${req.method} request to path ${req.path}`)
  next()
}

app.use(logger)

const decodeToken = async (req, res, next) => {
  const token = getTokenFromRequest(req)

  if (!token) {
    res.json({
      err: 'token not found'
    })
    return
  }

  try {
    const decodedToken = await jwt.verify(token, SECRET_KEY)
    req.decodedToken = decodedToken
    next()  

  } catch (e) {
    console.log(e.name)
    res.send(e.name)
    return
  }
}

app.use('/signup', signup)


app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})

