const multer = require('multer')
const path = require('path');

const DIR = './public/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 ) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb('Only .png, .jpg and .jpeg format allowed!')
    }
  }
})

module.exports = {
  upload
};