const verifyLoginCredentials = async (db, email, password) => {
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

module.exports = {
  verifyLoginCredentials
};
