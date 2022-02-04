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

module.exports = {
  createUser
}
