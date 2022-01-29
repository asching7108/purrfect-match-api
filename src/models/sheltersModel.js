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

    var vals = `${SqlUtil.Quote(params.shelterName)}, ${SqlUtil.Quote(params.address)}, ${SqlUtil.Quote(params.emailAddress)},
     ${SqlUtil.Quote(params.password)}, ${SqlUtil.Quote(params.phoneNumber)}, ${SqlUtil.Quote(params.website)}, ${SqlUtil.Quote(new Date())}`

    const sql = `INSERT INTO Shelter (ShelterName, Address, EmailAddress, Password, PhoneNumber,Website,LastUpdated) 
    VALUES (${vals})`;
    //console.log("Running insert query=" + sql )

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

module.exports = {
	getAllShelters,
    createShelters
};
