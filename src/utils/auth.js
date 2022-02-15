const bcrypt = require('bcryptjs');

// middleware that checks required authentication
function requireAuth(req, res, next) {
  //Invalid auth response example:
  //return res.status(401).json({ error: 'Unauthorized request' });
  next();
}

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword
}

function isCorrectPassword(hashedPassword, inputPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword)
}

module.exports = {
  requireAuth,
  hashPassword,
  isCorrectPassword
};
