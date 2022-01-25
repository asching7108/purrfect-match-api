const sheltersModel = require('../models/sheltersModel.js');

const { getAllShelters } = sheltersModel;

const getShelters = async (req, res, next) => {
	await getAllShelters()
		.then((dbResponse) => {
			console.log(dbResponse)
			res.send(dbResponse);
		})
		.catch((e) => {
			console.log(e.message);
			res.sendStatus(500);
			next(e);
		});
};

module.exports = {
	getShelters
};
