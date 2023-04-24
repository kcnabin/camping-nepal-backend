const unknownEndpoint = (req, res) => {
  console.log('unknown endpoint')
  
  res.status(400).json({
    err: 'unknown endpoint'
  })
}

module.exports = unknownEndpoint