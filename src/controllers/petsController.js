const petsModel = require('../models/petsModel.js');

const {
  getAllPets,
  postNewPet,
  getPetById,
  deletePetById,
  patchPetById
} = petsModel;

const getPets = async (req, res, next) => {
  await getAllPets()
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
  await postNewPet(req.body.newPet)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
      next(e);
    });
};

const getPet = async (req, res, next) => {
  console.log(req.params.PetID);
  await getPetById(req.params.PetID)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
      next(e);
    });
};

const deletePet = async (req, res, next) => {
  await deletePetById(req.params.PetID)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
      next(e);
    });
};

const patchPet = async (req, res, next) => {
  await patchPetById(req.params.PetID, req.body.petToUpdate)
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
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
