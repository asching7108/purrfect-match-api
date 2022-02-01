const {SqlUtil, inputValidation} = require("../utils/tools.js");
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
    
    var vals = [
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

module.exports = {
	getAllShelters,
    createShelters
};
