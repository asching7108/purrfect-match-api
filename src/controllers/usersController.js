const {
  createUser,
  getUserByID,
  updateUserByID,
  deleteUserByID
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

const getUser = async (req, res, next) => {
  await getUserByID(req.params.userID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) res.sendStatus(404);
      else res.send(dbResponse);
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
      next(e);
    });
};

const patchUser = async (req, res, next) => {
  // TODO: add auth

  let success = true;
  try {
    //check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    //check null values
    errList = inputValidation.getNullorEmpty(res, req.body, ["address", "distancePreference"]);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    await updateUserByID(req.params.userID, req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        console.log(e);
        res.sendStatus(500);
        next(e);
      });
  }
}

const deleteUser = async (req, res, next) => {
  // TODO: add auth

  // UserPet and UserPreference rows are deleted when user is deleted
  await deleteUserByID(req.params.userID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) res.sendStatus(404);
      else if (dbResponse.affectedRows == 1) res.sendStatus(204);
      else {
        console.log(res);
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
      next(e);
    });
}

module.exports = {
  postUsers,
  getUser,
  patchUser,
  deleteUser
};
