const { SqlUtil, inputValidation } = require("../utils/tools.js");
const db = require("./db.js");

const getAllShelters = async (params) => {
  const sql = `SELECT * FROM Shelter`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const createShelters = async (params) => {

  const sql = 'INSERT INTO Shelter (ShelterName, Address, EmailAddress, Password, PhoneNumber, Website, LastUpdated) '
    + 'VALUES (?, ?, ?, ?, ?, ?, NOW())';

    let vals = [
    params.shelterName,
    params.address,
    params.emailAddress,
    params.password,
    params.phoneNumber,
    params.website
  ];

  return new Promise((resolve, reject) => {
    db.query(sql, vals, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const getShelterByID = async (shelterID) => {

  const sql = 'SELECT * FROM Shelter WHERE ShelterID = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, shelterID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const updateShelterByID = async (shelterID, params) => {
  //get original values
  let original = await getShelterByID(shelterID);
  if(original.length == 0) throw new Error('Cannot find shelter data where shelterID=' + shelterID);
  //use coalesce() to avoid 'Column ... cannot be null' error 
  const sql = 'UPDATE Shelter SET ShelterName = coalesce(?, ?), Address = coalesce(?, ?), EmailAddress = coalesce(?, ?), '
  + 'Password = coalesce(?, ?), PhoneNumber = coalesce(?, ?), Website = ?, LastUpdated = NOW() '
  + 'WHERE ShelterID = ?;'
  const values = [
    params.shelterName, original[0].ShelterName,
    params.address, original[0].Address,
    params.emailAddress, original[0].EmailAddress,
    params.password, original[0].Password,
    params.phoneNumber, original[0].PhoneNumber,
    params.website,
    shelterID
  ]
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        console.log(res)
        resolve(res);
      }
    });
  });
}

const deleteShelterByID = async (shelterID) => {

  const sql = 'DELETE FROM Shelter WHERE ShelterID = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, shelterID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

module.exports = {
  getAllShelters,
  createShelters,
  getShelterByID,
  deleteShelterByID,
  updateShelterByID
};
