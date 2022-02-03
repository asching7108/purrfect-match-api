const sheltersModel = require('../models/sheltersModel.js');
const { inputValidation } = require("../utils/tools.js");

const { getAllShelters, createShelters, getShelterByID, deleteShelterByID, updateShelterByID } = sheltersModel;

const getShelters = async (req, res, next) => {
  await getAllShelters()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e);
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
  if (success) success = inputValidation.checkAttrs(res, req.body, attrs);
  //check null values
  if (success) success = inputValidation.checkNullorEmpty(res, req.body, ["website"]);

  if (success) {
    await createShelters(req.body)
      .then((dbResponse) => {
        res.status(201).type('json').send(dbResponse);
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("ER_DUP_ENTRY")) res.status(400).send("Duplicate entry");
        else
          res.sendStatus(500);
        next(e);
      });
  }
};

const getShelter = async (req, res, next) => {
  await getShelterByID(req.params.shelterID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) res.sendStatus(404);
      else res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
      next(e);
    });
};

const updateShelter = async (req, res, next) => {
  var success = true;
  //check content type
  success = inputValidation.checkContentType(req, res);
  //check null values
  if (success) success = inputValidation.checkNullorEmpty(res, req.body, ["website"]);

  if (success) {
    await updateShelterByID(req.params.shelterID, req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
        next(e);
      });
  }
};


const deleteShelter = async (req, res, next) => {
  //ShelterID is ON DELETE CASCADE, If a shelter is removed, those PET records associated with the ShelterID will be removed automatically
  await deleteShelterByID(req.params.shelterID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) res.sendStatus(404);
      else if (dbResponse.affectedRows == 1) res.sendStatus(204);
      else {
        console.log(res);
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
      next(e);
    });
};

module.exports = {
  getShelters,
  postShelters,
  getShelter,
  deleteShelter,
  updateShelter
};
