const multer = require('multer')
const { Logger } = require("../utils/log4js.js");
const log = Logger();
const DIR = './public/'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR)
  },
  filename: function (req, file, cb) {
    let index = file.mimetype.indexOf("/")
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "." + file.mimetype.substring(index + 1);
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
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
  }
})

let middleware = upload.single('petimage');

module.exports.send = (req, res, next) => {
  log.debug("Saving image to public folder...")
  let controller = (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (req.file == undefined) {
      res.status(400).json({ error: "Please save image!" });
    }
    else {
      res.status(201).send({ "fileName": req.file.filename, "path": "/" + (req.file.path).replace('\\', '/').replace('public', 'images') })
    }
  };

  middleware(req, res, controller); //callback
}
