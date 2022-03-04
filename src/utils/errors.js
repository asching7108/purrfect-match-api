const { Logger } = require("../utils/log4js.js");
const log = Logger();

// Reference: https://scoutapm.com/blog/express-error-handling
class ValidationError extends Error {
  constructor(errList) {
    super();
    this.name = this.constructor.name

    if (this instanceof ContentTypeError) {
      this.message = 'Incorrect content-type.'
      this.statusCode = 415
      log.debug('Content-type validation failed. Will return 415 Unsupported Media Type.');
      log.info('Error detail: ' + this.message);
    }
    else if (this instanceof PropNullorEmptyError) {
      this.message = '[' + errList + '] cannot be null or empty.'
      this.statusCode = 400
      log.debug('Attribute values validation failed. Will return 400 Bad Request.');
      log.info('Error detail: ' + this.message);
    }
    else if (this instanceof PropRequiredError) {
      this.message = 'Missing required attributes = [' + errList + ']'
      this.statusCode = 400
      log.debug('Required attributes validation failed. Will return 400 Bad Request.');
      log.info('Error detail: ' + this.message);
    }
    else if (this instanceof AuthorizationError) {
      this.message = 'Unauthorized request.'
      this.statusCode = 401;
      log.debug('Authorization failed. Will return 401 Unauthorized.');
      log.info('Error detail: ' + this.message);
    }
  }
}

// extending to child error classes
class ContentTypeError extends ValidationError { }
class PropNullorEmptyError extends ValidationError { }
class PropRequiredError extends ValidationError { }
class AuthorizationError extends ValidationError { }

module.exports = {
  ValidationError,
  ContentTypeError,
  PropNullorEmptyError,
  PropRequiredError,
  AuthorizationError
}
