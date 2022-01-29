const { json } = require('express');
const sheltersModel = require('../models/sheltersModel.js');
const { inputValidation} = require("../utils/tools.js");

const { getAllShelters, createShelters } = sheltersModel;

const getShelters = async (req, res, next) => {
	await getAllShelters()
		.then((dbResponse) => {
			res.send(dbResponse);
		})
		.catch((e) => {
			console.log(e.message);
			res.sendStatus(500);
			next(e);
		});
};

const postShelters = async (req, res, next) => {

	//check all attrs are provided (input validation)
	var attrs = ["address","emailAddress","password","phoneNumber","shelterName"];
	if(!inputValidation.hasAllAttrs(req.body, attrs)) res.status(400).send("Please provide required input attributes");
	else if(inputValidation.includesNullorEmpty(req.body, ["website"])) res.status(400).send("Please provide required input values");
	else{
		await createShelters(req.body)
		.then((dbResponse) => {
			res.status(201).send(dbResponse);
		})
		.catch((e) => {
			console.log(e.message);
			res.status(500);
			next(e);
		});
	}

	
};
module.exports = {
	getShelters,
	postShelters
};
