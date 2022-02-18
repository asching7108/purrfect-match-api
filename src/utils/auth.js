const { SECRET } = require('../config');
const { AuthorizationError } = require('./errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Logger } = require("../utils/log4js.js");
const log = Logger();

// middleware that checks required authentication
function requireAuth(req, res, next) {
  try {
    // verify token exists
    const token = req.headers['authorization']?.replace('Bearer ', '')
    if (token === undefined) {
      log.error('JWT not provided');
      throw new AuthorizationError;
    }

    // verify token is valid
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        log.error('JWT verification error');
        throw new AuthorizationError;
      }

      // get request userID/shelterID if any
      let userID = req.params.userID ? req.params.userID : req.body.userID;
      let shelterID = req.params.shelterID ? req.params.shelterID : req.body.shelterID;

      // verify user/shelter has access
      if (userID && userID != decoded.userID) {
        log.error('user does not have access');
        throw new AuthorizationError;
      }
      if (shelterID && shelterID != decoded.shelterID) {
        log.error('shelter does not have access');
        throw new AuthorizationError;
      };

      next();
    })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
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
