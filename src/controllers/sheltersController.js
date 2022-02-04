const sheltersModel = require('../models/sheltersModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
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

  let success = true;
  try {
    //check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    //check all attrs are provided (input validation)
    let errList = inputValidation.getMissingAttrs(res, req.body, ["address", "emailAddress", "password", "phoneNumber", "shelterName"])
    if (errList.length != 0) throw new PropRequiredError(errList);
    //check null values
    errList = inputValidation.getNullorEmpty(res, req.body, ["website"]);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

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
  let success = true;
  try {
    //check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    //check null values
    errList = inputValidation.getNullorEmpty(res, req.body, ["website"]);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

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
  postShelters,
  getShelter,
  deleteShelter,
  updateShelter
};
