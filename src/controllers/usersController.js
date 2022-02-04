const{} = require('../models/usersModel');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");

const postUsers = async (req, res, next) => {
  let success = true;
  try {
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    let errList = inputValidation.getMissingAttrs(res, req.body, ["firstName", "lastName", "email", "password", "zipCode"]);
    if (errList.length != 0) throw new PropRequiredError(errList);
    errList = inputValidation.getNullorEmpty(res, req.body, ["address", "distancePreference"]);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    // do stuff
  }
}