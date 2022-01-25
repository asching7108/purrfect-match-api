const db = require("./db.js");

const getAllShelters = async (params) => {
    const sql = `SELECT * FROM Shelter`;
    return new Promise((resolve, reject) => {
      db.query(sql, (err, res, feilds) => {
          if (err) {
              reject(err);
          } else {
              resolve(res);
          }
      });
    });
}

module.exports = {
	getAllShelters
};
