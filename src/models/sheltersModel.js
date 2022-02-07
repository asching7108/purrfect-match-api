const mysql = require("mysql");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const createShelters = async (db, params) => {

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
  log.debug("Running createShelters sql = " + mysql.format(sql, vals));
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

const getShelterByID = async (db, shelterID) => {

  const sql = 'SELECT * FROM Shelter WHERE ShelterID = ?';
  log.debug("Running getShelterByID sql = " + mysql.format(sql, shelterID));
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

const updateShelterByID = async (db, shelterID, params) => {
  //get original values
  let original = await getShelterByID(db, shelterID);
  if (original.length == 0) throw new Error('Cannot find shelter data where shelterID=' + shelterID);

  const website = params.hasOwnProperty('website') ? params.website : original[0].Website;
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
    website,
    shelterID
  ]

  log.debug("Running updateShelterByID sql = " + mysql.format(sql, values));
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

const deleteShelterByID = async (db, shelterID) => {

  const sql = 'DELETE FROM Shelter WHERE ShelterID = ?';
  log.debug("Running updateShelterByID sql = " + mysql.format(sql, shelterID));
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

const getAllPets = async (db, shelterID) => {
  const sql = `SELECT * FROM Pet WHERE ShelterID = ?`;
  log.debug("Running getAllShelters sql = " + mysql.format(sql, shelterID));
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
  createShelters,
  getShelterByID,
  deleteShelterByID,
  updateShelterByID,
  getAllPets
};
