const petsModel = require('../models/petsModel.js');

const {
  readAllPets,
  createNewPet
} = petsModel;

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
  await createNewPet(req.body.newPet)
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
  postPet
};
