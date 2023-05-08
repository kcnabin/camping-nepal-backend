const unknownEndpoint = (req, res, next) => {
  return next (new Error('Unknown Endpoint'))
}

module.exports = unknownEndpoint