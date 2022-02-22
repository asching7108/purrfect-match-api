const mysql = require('mysql');
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const createPreference = async (db, userID, params) => {
  const sql = 'INSERT INTO UserPreference (UserID, TypeOfAnimal, Breed, Sex, MinAge, MaxAge, More) '
    + 'VALUES (?, ?, ?, ?, ?, ?, ?)';

  const vals = [
    userID,
    JSON.stringify(params.typeOfAnimal),
    JSON.stringify(params.breed),
    params.sex,
    params.minAge,
    params.maxAge,
    JSON.stringify(params.more)
  ];
  log.debug("Running createPreference sql = " + mysql.format(sql, vals));
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

const getAllUserPreferences = async (db, userID) => {
  const sql = 'SELECT * FROM UserPreference WHERE UserID = ?';
  const vals = [userID];
  log.debug("Running getAllUserPreferences sql = " + mysql.format(sql, vals));
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

const deletePreferenceByID = async (db, preferenceID) => {
  const sql = 'DELETE FROM UserPreference WHERE UserPreferenceID = ?';
  log.debug("Running deletePreferenceByID sql = " + mysql.format(sql, preferenceID));
  return new Promise((resolve, reject) => {
    db.query(sql, preferenceID, (err, res, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

const deletePreferencesByUserID = async (db, userID) => {
  const sql = 'DELETE FROM UserPreference WHERE UserID = ?';
  log.debug("Running deletePreferencesByUserID sql = " + mysql.format(sql, userID));
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

module.exports = {
  createPreference,
  getAllUserPreferences,
  deletePreferenceByID,
  deletePreferencesByUserID
}
