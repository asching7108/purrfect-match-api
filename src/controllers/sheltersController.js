const sheltersModel = require('../models/sheltersModel.js');

const { getAllShelters } = sheltersModel;

const getShelters = async(req, res, next) => {
	let response = await getAllShelters();
	res.send(response).status(200);
  }

module.exports = {
	getShelters
};
