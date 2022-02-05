const app = require('./App');
const bodyParser = require('body-parser');

const petsController = require('./controllers/petsController');
const sheltersController = require('./controllers/sheltersController');
const usersController = require('./controllers/usersController');
const { db } = require("./models/db.js");
const { requireAuth } = require('./utils/auth');

const { Logger } = require("./utils/log4js.js");
const log = Logger();

const express = require('express');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

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

// Shelters
router.post('/shelters', sheltersController.postShelters);
router.get('/shelters/:shelterID', sheltersController.getShelter);
router.delete('/shelters/:shelterID', sheltersController.deleteShelter);
router.patch('/shelters/:shelterID', sheltersController.updateShelter);
router.get('/shelters/:shelterID/pets', sheltersController.getPets);

// Users

/* Start server */
app.use('/', router);

// Configure mySQL DB
app.set('db', db);

const { PORT } = require('./config');
app.listen(PORT, () => {
  log.debug(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
