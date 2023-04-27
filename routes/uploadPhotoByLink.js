const downloadImage = require('image-downloader')
const path = require('path')
const { getExtension } = require('../helper/getExtension')

const uploadPhoto = require('express').Router()

uploadPhoto.post('/', async (req, res, next) => {
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.' + getExtension(link)

  const options = {
    url: link,
    dest: (__dirname + '/../uploads/' + newName)
  }

  try {
    const imageResponse = await downloadImage.image(options)
    
    res.json({
      filename: newName
    })
  
  } catch (e) {
    console.log(e)
    return next(new Error('can not download image'))
  }
})

module.exports = uploadPhoto