// Reference: https://scoutapm.com/blog/express-error-handling
class ValidationError extends Error {
  constructor(errList) {
    super();
    this.name = this.constructor.name

    if (this instanceof ContentTypeError) {
      this.message  = 'Incorrect content-type.'
      this.statusCode = 415
    }
    else if (this instanceof PropNullorEmptyError){
      this.message  = '[' + errList + '] cannot be null or empty.'
      this.statusCode = 400
    }
    else if (this instanceof PropRequiredError){
      this.message  = 'Missing required attributes = [' + errList +  ']'
      this.statusCode = 400
    }
  }
}

// extending to child error classes
class ContentTypeError extends ValidationError { }
class PropNullorEmptyError extends ValidationError { }
class PropRequiredError extends ValidationError { }

module.exports = {
  ValidationError,
  ContentTypeError,
  PropNullorEmptyError,
  PropRequiredError
}