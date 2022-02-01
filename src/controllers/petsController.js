const petsModel = require('../models/petsModel.js');

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
  
  // checks required field
  for (const field of requiredFields) {
    if (newPet[field] == null) {
      return res.status(400).json({
        error: `Missing '${field}' in request body`
      });
    }
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
