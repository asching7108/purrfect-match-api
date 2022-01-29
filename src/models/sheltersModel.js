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

    var vals = `${SqlUtil.SQ(params.shelterName)}, ${SqlUtil.SQ(params.address)}, ${SqlUtil.SQ(params.emailAddress)},
     ${SqlUtil.SQ(params.password)}, ${SqlUtil.SQ(params.phoneNumber)}, ${SqlUtil.SQ(params.website)}, ${SqlUtil.SQ(new Date())}`

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
