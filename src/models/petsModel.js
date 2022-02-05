const mysql = require("mysql");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const getAllPets = async (db) => {
  const sql = 'SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website '
            + 'FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID '
            + 'ORDER BY p.PetID';
  log.debug("Running getAllPets sql = " + mysql.format(sql));
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const createNewPet = async (db, newPet) => {
  const sql = 'INSERT INTO Pet (Name, TypeOfAnimal, Breed, Sex, Age, Size, ShelterID, '
            + 'Picture, Availability, GoodWithOtherAnimals, GoodWithChildren, '
            + 'MustBeLeashed, Neutered, Vaccinated, HouseTrained, Description, '
            + 'LastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
  const values = [
    newPet.name,
    newPet.typeOfAnimal,
    newPet.breed,
    newPet.sex,
    newPet.age,
    newPet.size,
    newPet.shelterID,
    newPet.picture,
    newPet.availability,
    newPet.goodWithOtherAnimals,
    newPet.goodWithChildren,
    newPet.mustBeLeashed,
    newPet.neutered,
    newPet.vaccinated,
    newPet.houseTrained,
    newPet.description
  ];
  log.debug("Running createNewPet sql = " + mysql.format(sql, values));
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const getPetById = async (db, petID) => {
  const sql = 'SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website '
            + 'FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID '
            + 'WHERE PetID = ?';
  const values = [petID];
  log.debug("Running getPetById sql = " + mysql.format(sql, values));
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const deletePetById = async (db, petID) => {
  const sql = 'DELETE FROM Pet WHERE PetID = ?';
  const values = [petID];
  log.debug("Running deletePetById sql = " + mysql.format(sql, values));
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const updatePetById = async (db, petID, petToUpdate) => {
  const sql = 'UPDATE Pet SET Name = ?, TypeOfAnimal = ?, Breed = ?, Sex = ?, '
            + 'Age = ?, Size = ?, ShelterID = ?, Picture = ?, Availability = ?, '
            + 'GoodWithOtherAnimals = ?, GoodWithChildren = ?, MustBeLeashed = ?, '
            + 'Neutered = ?, Vaccinated = ?, HouseTrained = ?, Description = ?, ' 
            + 'LastUpdated = NOW() '
            + 'WHERE PetID = ?';
  const values = [
    petToUpdate.name,
    petToUpdate.typeOfAnimal,
    petToUpdate.breed,
    petToUpdate.sex,
    petToUpdate.age,
    petToUpdate.size,
    petToUpdate.shelterID,
    petToUpdate.picture,
    petToUpdate.availability,
    petToUpdate.goodWithOtherAnimals,
    petToUpdate.goodWithChildren,
    petToUpdate.mustBeLeashed,
    petToUpdate.neutered,
    petToUpdate.vaccinated,
    petToUpdate.houseTrained,
    petToUpdate.description,
    petID
  ];
  log.debug("Running updatePetById sql = " + mysql.format(sql, values));
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = {
  getAllPets,
  createNewPet,
  getPetById,
  deletePetById,
  updatePetById
};
