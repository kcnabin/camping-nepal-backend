const uploadFromDevice = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getExtension } = require('../helper/getExtension')

const photosMiddlware = multer({
  dest: path.join(__dirname + '/../uploads/')
})

uploadFromDevice.post('/', photosMiddlware.array('photos', 10), async (req, res, next) => {
  let uploadedPhotos = []

  try {
    for (let i=0; i<req.files.length; i++) {
      const {originalname, path, filename} = req.files[i]
      const ext = getExtension(originalname)
      const newName = filename + '.' + ext
      const newPath = path + '.' + ext
      
      fs.renameSync(path, newPath)
      uploadedPhotos.push(newName)
    }
    console.log('Files uploaded from device ')
    res.json(uploadedPhotos)

  } catch (e) {
    console.log(e)
    return next(new Error(`Error uploading from device`))
  }
} )

module.exports = uploadFromDevice