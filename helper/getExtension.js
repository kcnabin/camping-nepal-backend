const getExtension = (filename) => {
  const splitedNames = filename.split('.')
  const ext = splitedNames[splitedNames.length - 1]
  return ext
}

module.exports = {getExtension}