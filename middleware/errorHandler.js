const errorHandler = (error, req, res, next) => {
  console.log('error :', error);
  console.log('error.name :', error.name);
  console.log('error.message :', error.message);

  const code = error.code || 400

  if (error.name == 'CastError') {
    res.status(code).json({
      err: 'Malformatted ID'
    })
    return
  }
  
  res.status(code).json({
    err: (error.name === 'Error' ? error.message : error.name)
  })
}

module.exports = errorHandler