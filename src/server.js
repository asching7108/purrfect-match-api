const app = require('./App');
const bodyParser = require('body-parser');
const cors = require('cors');

const petsController = require('./controllers/petsController');
const sheltersController = require('./controllers/sheltersController');
const usersController = require('./controllers/usersController');

const express = require('express');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

// allows CORS used in /login
router.use(cors());

/* API endpoints */ 

// Pets
router.get('/pets', petsController.getPets);

// Shelters
router.get('/shelters/test', sheltersController.getShelters); //temp route to test database

// Users
router.post('/login', usersController.login);

/* Start server */
app.use('/', router);

const { PORT } = require('./config');
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
