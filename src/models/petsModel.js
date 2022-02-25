const mysql = require("mysql");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const retrievePets = async (db, query) => {
  const sql = `SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website
              FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID
              WHERE 1
              ${query.availability ? 'AND p.Availability = ?' : ''}
              ${query.shelterID ? 'AND p.ShelterID = ?' : ''}
              ${query.typeOfAnimal ? 'AND p.TypeOfAnimal in (?)' : ''}
              ${query.breed ? 'AND p.Breed in (?)' : ''}
              ${query.sex ? 'AND p.Sex = ?' : ''}
              ${query.minAge ? 'AND p.Age >= ?' : ''}
              ${query.maxAge ? 'AND p.Age <= ?' : ''}
              ${query.goodWithOtherAnimals ? 'AND p.GoodWithOtherAnimals' : ''}
              ${query.goodWithChildren ? 'AND p.GoodWithChildren' : ''}
              ${query.leashNotRequired ? 'AND p.MustBeLeashed = 0' : ''}
              ${query.neutered ? 'AND p.Neutered' : ''}
              ${query.vaccinated ? 'AND p.Vaccinated' : ''}
              ${query.houseTrained ? 'AND p.HouseTrained' : ''}
              ORDER BY p.LastUpdated desc
              ${query.limit ? 'LIMIT ?' : ''}`;
  const values = [];
  if (query.availability) values.push(query.availability);
  if (query.shelterID) values.push(query.shelterID);
  if (query.typeOfAnimal) values.push(query.typeOfAnimal.split(','));
  if (query.breed) values.push(query.breed.split(','));
  if (query.sex) values.push(query.sex);
  if (query.minAge) values.push(query.minAge);
  if (query.maxAge) values.push(query.maxAge);
  if (query.limit) values.push(parseInt(query.limit));

  log.debug("Running retrievePets sql = " + mysql.format(sql, values));
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

const updatePetById = async (db, petID, petToUpdate, original) => {
  const name = petToUpdate.hasOwnProperty('name') ? petToUpdate.name : original.Name;
  const age = petToUpdate.hasOwnProperty('age') ? petToUpdate.age : original.Age;
  // use coalesce() to avoid 'Column ... cannot be null' error
  const sql = 'UPDATE Pet SET Name = ?, TypeOfAnimal = coalesce(?, ?), Breed = coalesce(?, ?), '
            + 'Sex = coalesce(?, ?), Age = ?, Size = coalesce(?, ?), '
            + 'Picture = coalesce(?, ?), Availability = coalesce(?, ?), '
            + 'GoodWithOtherAnimals = coalesce(?, ?), GoodWithChildren = coalesce(?, ?), '
            + 'MustBeLeashed = coalesce(?, ?), Neutered = coalesce(?, ?), '
            + 'Vaccinated = coalesce(?, ?), HouseTrained = coalesce(?, ?), '
            + 'Description = coalesce(?, ?), LastUpdated = NOW() '
            + 'WHERE PetID = ? AND ShelterID = ?';
  const values = [
    name,
    petToUpdate.typeOfAnimal, original.TypeOfAnimal,
    petToUpdate.breed, original.Breed,
    petToUpdate.sex, original.Sex,
    age,
    petToUpdate.size, original.Size,
    petToUpdate.picture, original.Picture,
    petToUpdate.availability, original.Availability,
    petToUpdate.goodWithOtherAnimals, original.GoodWithOtherAnimals,
    petToUpdate.goodWithChildren, original.GoodWithChildren,
    petToUpdate.mustBeLeashed, original.MustBeLeashed,
    petToUpdate.neutered, original.Neutered,
    petToUpdate.vaccinated, original.Vaccinated,
    petToUpdate.houseTrained, original.HouseTrained,
    petToUpdate.description, original.Description,
    petID,
    petToUpdate.shelterID
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

const getAllNews = async (db, query) => {
  const sql = `SELECT i.*, p.*, s.ShelterName FROM PetNewsItem i
              INNER JOIN Pet p ON i.PetID = p.PetID
              INNER JOIN Shelter s ON p.ShelterID = s.ShelterID
              ORDER BY i.DatePosted DESC`;
  log.debug("Running getAllNews sql = " + mysql.format(sql));
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

const createPetNews = async (db, petID, newsItem) => {
  const sql = 'INSERT INTO PetNewsItem (PetID, NewsItem, DatePosted) '
            + 'VALUES (?, ?, NOW())';
  const values = [petID, newsItem];
  log.debug("Running createPetNews sql = " + mysql.format(sql, values));
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

const getPetNewsByPetId = async (db, petID) => {
  const sql = 'SELECT * FROM PetNewsItem WHERE PetID = ? ORDER BY DatePosted DESC';
  const values = [petID];
  log.debug("Running getPetNewsByPetId sql = " + mysql.format(sql, values));
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

const deletePetNewsById = async (db, newsItemID) => {
  const sql = 'DELETE FROM PetNewsItem WHERE NewsItemID = ?';
  const values = [newsItemID];
  log.debug("Running deletePetNewsById sql = " + mysql.format(sql, values));
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

const getAllBreeds = async (db) => {
  const sql = 'SELECT * FROM PetBreed';
  log.debug("Running getAllBreeds sql = " + mysql.format(sql));
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

module.exports = {
  retrievePets,
  createNewPet,
  getPetById,
  deletePetById,
  updatePetById,
  getAllNews,
  createPetNews,
  getPetNewsByPetId,
  deletePetNewsById,
  getAllBreeds
};
