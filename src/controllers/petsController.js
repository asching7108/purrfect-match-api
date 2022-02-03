const petsModel = require('../models/petsModel.js');
const { inputValidation } = require("../utils/tools.js");

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
  const contentType = req.headers['content-type'];
  
  // checks content type
  if (!contentType || contentType.indexOf('application/json') !== 0) {
    return res.sendStatus(415);
  }

  // checks all attrs are provided (input validation)
  if (!inputValidation.hasAllAttrs(newPet, requiredFields)) {
    return res.status(400).json({
      error: "Please provide required input attributes"
    });
  }
  // checks null values
  if (inputValidation.includesNullorEmpty(newPet, optionalFields)) {
    return res.status(400).json({
      error: "Please provide required input values"
    });
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
