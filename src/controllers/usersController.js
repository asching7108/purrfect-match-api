const {
  createUser
} = require('../models/usersModel');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");

const postUsers = async (req, res, next) => {

  let success = true;
  try {
    // content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // all required attributes are provided
    let errList = inputValidation.getMissingAttrs(res, req.body, ["firstName", "lastName", "email", "password", "zipCode"]);
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body, ["address", "distancePreference"]);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    await createUser(req.body)
      .then((dbResponse) => {
        res.status(201).type('json').send(dbResponse);
      })
      .catch((e) => {
        console.log(e);
        if (e.message.includes("ER_DUP_ENTRY")) res.status(400).send("Duplicate entry");
        else
          res.sendStatus(500);
        next(e);
      });
  }
};

module.exports = {
  postUsers
};
