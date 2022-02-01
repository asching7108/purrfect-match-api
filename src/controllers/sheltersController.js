const { json } = require('express');
const sheltersModel = require('../models/sheltersModel.js');
const { inputValidation } = require("../utils/tools.js");

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

  var attrs = ["address", "emailAddress", "password", "phoneNumber", "shelterName"];
  var contype = req.headers['content-type'];
  //check content type
  if (!contype || contype.indexOf('application/json') !== 0) res.sendStatus(406);
  //check all attrs are provided (input validation)
  else if (!inputValidation.hasAllAttrs(req.body, attrs)) res.status(400).send("Please provide required input attributes");
  //check null values
  else if (inputValidation.includesNullorEmpty(req.body, ["website"])) res.status(400).send("Please provide required input values");
  else {
    await createShelters(req.body)
      .then((dbResponse) => {
        res.status(201).type('json').send(dbResponse);
      })
      .catch((e) => {
        console.log(e.message)
        if (e.message.includes("ER_DUP_ENTRY")) res.status(400).send("Duplicate entry");
        else
          res.sendStatus(500);
        next(e);
      });
  }


};
module.exports = {
  getShelters,
  postShelters
};
