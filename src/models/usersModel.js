const db = require('./db');

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
  if (original.length == 0) throw new Error('Cannot find shelter data where shelterID=' + shelterID);

  const sql = 'UPDATE User SET FirstName = coalesce(?, ?), LastName = coalesce(?, ?), EmailAddress = coalesce(?, ?), '
    + 'Password = coalesce(?, ?), Address = ?, ZipCode = coalesce(?, ?), DistancePreference = ?, LastUpdated = NOW() '
    + 'WHERE UserID = ?;'

  const values = [
    params.firstName, original[0].FirstName,
    params.lastName, original[0].LastName,
    params.emailAddress, original[0].EmailAddress,
    params.password, original[0].Password,
    params.address,
    params.zipCode, original[0].ZipCode,
    params.distancePreference,
    userID
  ];

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

const deleteUserByID = async (userID) => {

  const sql = 'DELETE FROM User WHERE UserID = ?';
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
  createUser,
  getUserByID,
  updateUserByID,
  deleteUserByID
}
