const db = require("./db.js");

const getAllPets = async () => {
  const sql = 'SELECT * FROM Pet p INNER JOIN Shelter s ON p.ShelterID = s.ShelterID';
    return new Promise((resolve, reject) => {
      db.query(sql, (err, res, fields) => {
        if (err) {
          console.log(err);
        } else {
          resolve(res);
        }
      });
    });
};

module.exports = {
  getAllPets
};
