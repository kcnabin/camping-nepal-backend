const logger = (req, res, next) => {
  console.log(`${req.method} request to path ${req.path}`)
  next()
}

module.exports = logger