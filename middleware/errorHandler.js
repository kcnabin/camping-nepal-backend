const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  
  const code = error.code || 400
  res.status(code).json({
    err: error.message
  })
}

module.exports = errorHandler