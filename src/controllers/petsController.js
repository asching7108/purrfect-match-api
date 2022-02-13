const petsModel = require('../models/petsModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const {
  getAllPets,
  createNewPet,
  getPetById,
  deletePetById,
  updatePetById
} = petsModel;

const requiredFields = [
  'typeOfAnimal',
  'breed',
  'sex',
  'size',
  'shelterID',
  'picture',
  'availability',
  'goodWithOtherAnimals',
  'goodWithChildren',
  'mustBeLeashed',
  'neutered',
  'vaccinated',
  'houseTrained',
  'description'
];

const optionalFields = [
  'name',
  'age'
];

const getPets = async (req, res, next) => {
  log.debug("Calling getPets...");
  await getAllPets(req.app.get('db'))
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const postPet = async (req, res, next) => {
  log.debug("Calling postPets...Verifying user inputs...");

  try {
    // check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check all attrs are provided (input validation)
    let errList = inputValidation.getMissingAttrs(res, req.body, requiredFields)
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body, optionalFields);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  await createNewPet(req.app.get('db'), req.body)
    .then((dbResponse) => {
      res.status(201).send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const getPet = async (req, res, next) => {
  log.debug("Calling getPet...");
  await getPetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      res.send(dbResponse[0]);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const deletePet = async (req, res, next) => {
  log.debug("Calling deletePet...");
  await deletePetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      res.sendStatus(204);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const patchPet = async (req, res, next) => {
  log.debug("Calling patchPets...Verifying user inputs...");
  const { petID } = req.params;

  try {
    // check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check null values
    const errList = inputValidation.getNullorEmpty(res, req.body, optionalFields);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // verify that petID exists and get original values first
  await getPetById(req.app.get('db'), petID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      updatePetById(req.app.get('db'), petID, req.body, dbResponse[0])
        .then(() => {
          res.sendStatus(200);
        })
        .catch((e) => {
          log.error(e);
          res.status(500).json({ error: e.message });
          next(e);
        });
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

module.exports = {
  getPets,
  postPet,
  getPet,
  deletePet,
  patchPet
};
