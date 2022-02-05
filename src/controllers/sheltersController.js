const sheltersModel = require('../models/sheltersModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { createShelters, getShelterByID, deleteShelterByID, updateShelterByID, getAllPets } = sheltersModel;
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const postShelters = async (req, res, next) => {
  log.debug("Calling postShelters...Verifying user inputs...");
  let success = true;
  try {
    //check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
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
        log.error(e);
        if (e.message.includes("ER_DUP_ENTRY")) res.status(400).send("Duplicate entry");
        else
          res.sendStatus(500);
        next(e);
      });
  }
};

const getShelter = async (req, res, next) => {
  log.debug("Calling getShelter...");
  await getShelterByID(req.params.shelterID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) res.sendStatus(404);
      else res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
};

const updateShelter = async (req, res, next) => {
  log.debug("Calling updateShelter...Verifying user inputs...");
  let success = true;
  try {
    //check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
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
        log.error(e);
        res.sendStatus(500);
        next(e);
      });
  }
};


const deleteShelter = async (req, res, next) => {
  log.debug("Calling deleteShelter...");
  //ShelterID is ON DELETE CASCADE, If a shelter is removed, those PET records associated with the ShelterID will be removed automatically
  await deleteShelterByID(req.params.shelterID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) res.sendStatus(404);
      else if (dbResponse.affectedRows == 1) res.sendStatus(204);
      else {
        log.error(res);
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
};

const getPets = async (req, res, next) => {
  log.debug("Calling getPets...");

  let foundShelter = false;
  await getShelterByID(req.params.shelterID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) res.status(404).send("Shelter not found");
      else foundShelter = true;
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });

  if (foundShelter) {
    log.debug("Looking for pets for shelterID == " + req.params.shelterID);
    await getAllPets(req.params.shelterID)
      .then((dbResponse) => {
        res.status(200).send(dbResponse);
      })
      .catch((e) => {
        log.error(e);
        res.sendStatus(500);
        next(e);
      });
  }

};

module.exports = {
  postShelters,
  getShelter,
  deleteShelter,
  updateShelter,
  getPets
};
