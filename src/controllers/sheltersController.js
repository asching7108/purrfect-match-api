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

  var success = true;
  //check content type
  success = inputValidation.checkContentType(req, res);
  //check all attrs are provided (input validation)
  var attrs = ["address", "emailAddress", "password", "phoneNumber", "shelterName"];
  if(success) success = inputValidation.checkAttrs(res, req.body, attrs);
  //check null values
  if(success) success = inputValidation.checkNullorEmpty(res, req.body, ["website"]);

  if(success) {
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
