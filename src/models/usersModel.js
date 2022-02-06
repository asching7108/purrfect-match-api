const db = require('./db');
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const createUser = async (params) => {

  const sql = 'INSERT INTO User (FirstName, LastName, EmailAddress, Password, Address, ZipCode, DistancePreference, LastUpdated) '
    + 'VALUES (?, ?, ?, ?, ?, ?, ?, NOW())';

  let vals = [
    params.firstName,
    params.lastName,
    params.email,
    params.password,
    params.address,
    params.zipCode,
    params.distancePreference
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

const getUserByID = async (userID) => {

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

const updateUserByID = async (userID, params) => {
  //get original values
  let original = await getUserByID(userID);
  if (original.length == 0) throw new Error('Cannot find user data where userID=' + userID);

  const sql = 'UPDATE User SET FirstName = coalesce(?, ?), LastName = coalesce(?, ?), EmailAddress = coalesce(?, ?), '
    + 'Password = coalesce(?, ?), Address = ?, ZipCode = coalesce(?, ?), DistancePreference = ?, LastUpdated = NOW() '
    + 'WHERE UserID = ?;'

  // Only change optional values is explicitly added in req.body
  const address = params.hasOwnProperty('address') ? params.address : original[0].Address;
  const distancePreference = params.hasOwnProperty('distancePreference') ? params.distancePreference : original[0].DistancePreference;

  const values = [
    params.firstName, original[0].FirstName,
    params.lastName, original[0].LastName,
    params.emailAddress, original[0].EmailAddress,
    params.password, original[0].Password,
    address,
    params.zipCode, original[0].ZipCode,
    distancePreference,
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

const deleteUserByID = async (userID) => {

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

const verifyLoginCredentials = async (email, password) => {
  const sql = `SELECT UserID FROM User WHERE EmailAddress = ? AND Password = ?`;
  const values = [email, password];
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
  verifyLoginCredentials
}
