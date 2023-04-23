const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const PORT = 4000
const SECRET_KEY = 'SUPER_SECRET_KEY'
const {getTokenFromRequest} = require('./helper/getTokenFromRequest')

app.use(express.json())
app.use((req, res, next) => {
  console.log(req.headers)
  next()
})

const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} request to path ${req.path}`)
  next()
}

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


app.post('/place', decodeToken, (req, res) => {
  
  console.log('I passed through middleware :', req.decodedToken );
  res.json({
    msg: 'post req to /place'
  })
})

app.post('/nabin', decodeToken, (req, res) => {
  console.log(req.decodedToken)
  res.send('I am in nabin endpoint')
})

app.get('/', loggerMiddleware, (req, res) => {
  res.send('homepage')
})

app.get('/no-log', (req, res) => {
  res.send('no logging in this route')
})

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
})

