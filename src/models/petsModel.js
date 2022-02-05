const db = require("./db.js");

const readAllPets = async () => {
  const sql = 'SELECT p.*, s.ShelterName, s.Address, s.EmailAddress, s.PhoneNumber, s.Website '
            + 'FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID '
            + 'ORDER BY p.PetID';
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

const createNewPet = async (newPet) => {
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

module.exports = {
  readAllPets,
  createNewPet
};
