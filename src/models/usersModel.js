const mysql = require('mysql');
const { Logger } = require("../utils/log4js.js");
const log = Logger();
const { hashPassword } = require('../utils/auth');

const createUser = async (db, params) => {

  const sql = 'INSERT INTO User (FirstName, LastName, EmailAddress, Password, ZipCode, LastUpdated) '
    + 'VALUES (?, ?, ?, ?, ?, NOW())';

  let vals = [
    params.firstName,
    params.lastName,
    params.email,
    hashPassword(params.password),
    params.zipCode
  ];
  log.debug("Running createUser sql = " + mysql.format(sql, vals));
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

const getUserByID = async (db, userID) => {

  const sql = 'SELECT * FROM User WHERE UserID = ?'
  log.debug("Running getUserByID sql = " + mysql.format(sql, userID));
  return new Promise((resolve, reject) => {
    db.query(sql, userID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const updateUserByID = async (db, userID, params) => {
  //get original values
  let original = await getUserByID(db, userID);
  if (original.length == 0) throw new Error('Cannot find user data where userID=' + userID);

  const sql = 'UPDATE User SET FirstName = coalesce(?, ?), LastName = coalesce(?, ?), EmailAddress = coalesce(?, ?), '
    + 'Password = coalesce(?, ?), ZipCode = coalesce(?, ?), LastUpdated = NOW() '
    + 'WHERE UserID = ?;'

  // Handle password hashing if password exists
  const password = params.password ? hashPassword(params.password) : null;

  const values = [
    params.firstName, original[0].FirstName,
    params.lastName, original[0].LastName,
    params.email, original[0].EmailAddress,
    password, original[0].Password,
    params.zipCode, original[0].ZipCode,
    userID
  ];

  log.debug("Running updateUserByID sql = " + mysql.format(sql, values));
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

const deleteUserByID = async (db, userID) => {
  const sql = 'DELETE FROM User WHERE UserID = ?';
  log.debug("Running deleteUserByID sql = " + mysql.format(sql, userID));
  return new Promise((resolve, reject) => {
    db.query(sql, userID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const addPetToFavorites = async (db, userID, petID) => {
  const sql = 'INSERT INTO UserPet (UserID, PetID) VALUES (?, ?)';
  const values = [userID, petID];
  log.debug("Running addPetToFavorites sql = " + mysql.format(sql, values));
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

const getUserFavorites = async (db, userID) => {
  const sql = 'SELECT PetID FROM UserPet WHERE UserID = ?';
  log.debug("Running getUserFavorites sql = " + mysql.format(sql, userID));
  return new Promise((resolve, reject) => {
    db.query(sql, userID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const deleteUserFavorite = async (db, userID, petID) => {
  const sql = 'DELETE FROM UserPet WHERE UserID = ? AND PetID = ?';
  const values = [userID, petID];
  log.debug("Running deleteUserFavorites sql = " + mysql.format(sql, values));
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

const getLoginCredentials = async (db, email) => {
  const sql = `SELECT UserID, Password FROM User WHERE EmailAddress = ?`;
  const values = [email];
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
  createUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  addPetToFavorites,
  getUserFavorites,
  deleteUserFavorite,
  getLoginCredentials
}
