const app = require('./App');
const bodyParser = require('body-parser');
const cors = require('cors');

const petsController = require('./controllers/petsController');
const sheltersController = require('./controllers/sheltersController');
const usersController = require('./controllers/usersController');
const { requireAuth } = require('./utils/auth');

const { Logger } = require("./utils/log4js.js");
const log = Logger();

const express = require('express');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

// allows CORS used in /login
router.use(cors());

/* API endpoints */
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Pets
router.get('/pets', petsController.getPets);
router.post('/pets', requireAuth, petsController.postPet);

// Shelters
router.post('/shelters', sheltersController.postShelters);
router.get('/shelters/:shelterID', sheltersController.getShelter);
router.delete('/shelters/:shelterID', sheltersController.deleteShelter);
router.patch('/shelters/:shelterID', sheltersController.updateShelter);
router.get('/shelters/:shelterID/pets', sheltersController.getPets);

// Users
router.post('/login', usersController.loginUser);
router.post('/users', usersController.postUsers);
router.get('/users/:userID', usersController.getUser);
router.patch('/users/:userID', usersController.patchUser);
router.delete('/users/:userID', usersController.deleteUser);

/* Start server */
app.use('/', router);

const { PORT } = require('./config');
app.listen(PORT, () => {
  log.debug(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
