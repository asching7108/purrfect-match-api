const { SECRET } = require('../config');
const { AuthorizationError } = require('./errors');
const jwt = require('jsonwebtoken');
const { Logger } = require("../utils/log4js.js");
const log = Logger();

// middleware that checks required authentication
function requireAuth(req, res, next) {
  try {
    // verify token exists
    const token = req.headers['authorization']?.replace('Bearer ', '')
    if (token === undefined) {
      log.debug('JWT not provided');
      throw new AuthorizationError;
    }

    // verify token is valid
    jwt.verify(token, SECRET, function (err, decoded) {
      if (err) {
        log.debug('JWT verification error');
        throw new AuthorizationError;
      }

      // get request userID/shelterID if any
      let userID = req.params.userID ? req.params.userID : req.body.userID;
      let shelterID = req.params.shelterID ? req.params.shelterID : req.body.shelterID;

      // verify user/shelter has access
      if (userID && userID != decoded.userID) {
        log.debug('user does not have access');
        throw new AuthorizationError;
      }
      if (shelterID && shelterID != decoded.shelterID) {
        log.debug('shelter does not have access');
        throw new AuthorizationError;
      };

      next();
    })
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }
}

module.exports = { requireAuth };
