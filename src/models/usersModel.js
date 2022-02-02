const db = require('./db.js');

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
};

const updateUserSession = async (userID, token) => {
  const sql = `UPDATE User
    SET SessionID = ?
    WHERE UserID = ?`
  const values = [token, userID];
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
  verifyLoginCredentials,
  updateUserSession
};
