const app = require('./App');
const bodyParser = require('body-parser');

const petsController = require('./controllers/petsController');
const sheltersController = require('./controllers/sheltersController');
const usersController = require('./controllers/usersController');

const express = require('express');
const router = express.Router();

// Automatically parse request body as JSON
router.use(bodyParser.json());

/**
 * API endpoints
 */ 

// Pets
router.get('/pets', petsController.getPets);

// Shelters

// Users

/**
 * Start server
 */
app.use('/', router);

const { PORT } = require('./config');
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
