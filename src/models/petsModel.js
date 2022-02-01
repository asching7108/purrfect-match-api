const db = require("./db.js");

const getAllPets = async () => {
  const sql = 'SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website '
            + 'FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID';
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

const postNewPet = async (newPet) => {
  const sql = 'INSERT INTO Pet (Name, TypeOfAnimal, Breed, Sex, Age, Size, ShelterID, '
            + 'Picture, Availability, GoodWithOtherAnimals, GoodWithChildren, '
            + 'MustBeLeashed, Neutered, Vaccinated, HouseTrained, Description, '
            + 'LastUpdated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())';
  const values = [
    newPet.Name,
    newPet.TypeOfAnimal,
    newPet.Breed,
    newPet.Sex,
    newPet.Age,
    newPet.Size,
    newPet.ShelterID,
    newPet.Picture,
    newPet.Availability,
    newPet.GoodWithOtherAnimals,
    newPet.GoodWithChildren,
    newPet.MustBeLeashed,
    newPet.Neutered,
    newPet.Vaccinated,
    newPet.HouseTrained,
    newPet.Description
  ];
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

const getPetById = async (PetID) => {
  const sql = 'SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website '
            + 'FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID '
            + 'WHERE PetID = ?';
  const values = [PetID];
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

const deletePetById = async (PetID) => {
  const sql = 'DELETE FROM Pet WHERE PetID = ?';
  const values = [PetID];
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

const patchPetById = async (PetID, petToUpdate) => {
  const sql = 'UPDATE Pet SET Name = ?, TypeOfAnimal = ?, Breed = ?, Sex = ?, '
            + 'Age = ?, Size = ?, ShelterID = ?, Picture = ?, Availability = ?, '
            + 'GoodWithOtherAnimals = ?, GoodWithChildren = ?, MustBeLeashed = ?, '
            + 'Neutered = ?, Vaccinated = ?, HouseTrained = ?, Description = ?, ' 
            + 'LastUpdated = NOW() '
            + 'WHERE PetID = ?';
  const values = [
    petToUpdate.Name,
    petToUpdate.TypeOfAnimal,
    petToUpdate.Breed,
    petToUpdate.Sex,
    petToUpdate.Age,
    petToUpdate.Size,
    petToUpdate.ShelterID,
    petToUpdate.Picture,
    petToUpdate.Availability,
    petToUpdate.GoodWithOtherAnimals,
    petToUpdate.GoodWithChildren,
    petToUpdate.MustBeLeashed,
    petToUpdate.Neutered,
    petToUpdate.Vaccinated,
    petToUpdate.HouseTrained,
    petToUpdate.Description,
    PetID
  ];
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
  postNewPet,
  getPetById,
  deletePetById,
  patchPetById
};
