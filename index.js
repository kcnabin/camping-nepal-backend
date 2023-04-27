require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const signup = require('./routes/signup')
const logger = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const unknownEndpoint = require('./middleware/unknownEndpoint')
const login = require('./routes/login')
const places = require('./routes/places')
const uploadPhoto = require('./routes/uploadPhotoByLink')

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

try {
  const connectToDB = async () => {
    await mongoose.connect(MONGO_URL)
    console.log('--Connected to DB--')
  }
  connectToDB()

} catch (e) {
  console.log('--Error connecting to DB--')
}

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/signup', signup)
app.use('/login', login)
app.use('/places', places)
app.use('/uploadPhoto', uploadPhoto)

app.use(unknownEndpoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})

