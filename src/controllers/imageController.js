const multer = require('multer')
const path = require('path');
const { Logger } = require("../utils/log4js.js");
const log = Logger();
const DIR = './public/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb('Only .png, .jpg and .jpeg format allowed!')
    }
  }
})

let middleware = upload.single('petimage');

module.exports.send = (req, res, next) => {
  log.debug("Saving image to public folder...")
  let controller = () => {
      if (!req.file) return res.json({ error: "something went wrong" })

    res.status(201).send({ "fileName": req.file.filename, "path": "/" + (req.file.path).replace('\\', '/').replace('public', 'images') })
  };

  middleware(req, res, controller); //callback
}

