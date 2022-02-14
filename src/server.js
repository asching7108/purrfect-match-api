const app = require('./App');
const bodyParser = require('body-parser');
const cors = require('cors');

const petsController = require('./controllers/petsController');
const sheltersController = require('./controllers/sheltersController');
const usersController = require('./controllers/usersController');
const imageController = require('./controllers/multer');
const { db } = require("./models/db.js");
const { requireAuth } = require('./utils/auth');

const { Logger } = require("./utils/log4js.js");
const log = Logger();

const express = require('express');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

// allows CORS used in /login
router.use(cors());

// set static folder
var path = require('path');
app.use("/images",express.static(path.join(__dirname, '/../public')));
console.log(path.join(__dirname, '/../public'))

/* API endpoints */
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Pets
router.get('/pets', petsController.getPets);
router.post('/pets', requireAuth, petsController.postPet);  //temp middleware
router.get('/pets/:petID', petsController.getPet);
router.delete('/pets/:petID', requireAuth, petsController.deletePet); //temp middleware
router.patch('/pets/:petID', requireAuth, petsController.patchPet); //temp middleware

router.post('/pets/imgupload', imageController.upload.single('petimage'), function (req, res, next) {
  if (!req.file) return res.json({ error: "something went wrong" })
  next()
  const fullUrl = req.protocol + '://' + req.get('host') + '/' + (req.file.path).replace('\\', '/').replace('public', 'images');
  res.status(201).send({"fileName": req.file.filename, "path": fullUrl})
});

// Shelters
router.post('/shelters', sheltersController.postShelters);
router.get('/shelters/:shelterID', sheltersController.getShelter);
router.delete('/shelters/:shelterID', sheltersController.deleteShelter);
router.patch('/shelters/:shelterID', sheltersController.updateShelter);
router.get('/shelters/:shelterID/pets', sheltersController.getPets);
router.post('/shelters/login', sheltersController.loginShelter);

// Users
router.post('/users/login', usersController.loginUser);
router.post('/users', usersController.postUsers);
router.get('/users/:userID', usersController.getUser);
router.patch('/users/:userID', usersController.patchUser);
router.delete('/users/:userID', usersController.deleteUser);

/* Start server */
app.use('/', router);

// Configure mySQL DB
app.set('db', db);

const { PORT } = require('./config');
app.listen(PORT, () => {
  log.debug(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
