const petsModel = require('../models/petsModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");

const {
  readAllPets,
  createNewPet
} = petsModel;

const requiredFields = [
  'TypeOfAnimal',
  'Breed',
  'Sex',
  'Size',
  'ShelterID',
  'Picture',
  'Availability',
  'GoodWithOtherAnimals',
  'GoodWithChildren',
  'MustBeLeashed',
  'Neutered',
  'Vaccinated',
  'HouseTrained',
  'Description'
];

const optionalFields = [
  'Name',
  'Age'
];

const getPets = async (req, res, next) => {
  await readAllPets()
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
      next(e);
    });
};

const postPet = async (req, res, next) => {
  const { newPet } = req.body;

  try {
    // check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check all attrs are provided (input validation)
    let errList = inputValidation.getMissingAttrs(res, newPet, requiredFields)
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, newPet, optionalFields);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    return res.status(err.statusCode).send(err.message);
  }

  await createNewPet(newPet)
    .then((dbResponse) => {
      res.status(201).send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
      next(e);
    });
};

module.exports = {
  getPets,
  postPet
};
