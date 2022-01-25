const petsModel = require('../models/petsModel.js');

const { getAllPets } = petsModel;

const getPets = async (req, res, next) => {
	await getAllPets()
		.then((dbResponse) => {
			res.send(dbResponse);
		})
		.catch((e) => {
			console.log(e.message);
			res.sendStatus(500);
			next(e);
		});
};

module.exports = {
	getPets
};
