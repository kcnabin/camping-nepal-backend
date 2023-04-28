const getExtension = (filename) => {
  if (filename) {
    const splitedNames = filename.split('.')
    const ext = splitedNames[splitedNames.length - 1]
    return ext
  }
  return 'jpg'
}

module.exports = {getExtension}