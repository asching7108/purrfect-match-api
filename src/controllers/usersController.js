const {
  createUser,
  getUserByID,
  updateUserByID,
  deleteUserByID,
  addPetToFavorites,
  getUserFavorites,
  deleteUserFavorite,
  getLoginCredentials
} = require('../models/usersModel');
const { getPetById } = require('../models/petsModel')

const { inputValidation } = require('../utils/tools');
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { Logger } = require("../utils/log4js.js");
const log = Logger();
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const { isCorrectPassword } = require('../utils/auth');


const postUsers = async (req, res, next) => {
  log.debug("Calling postUsers...Verifying user inputs...");
  let success = true;
  try {
    // content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // all required attributes are provided
    let errList = inputValidation.getMissingAttrs(res, req.body, ["firstName", "lastName", "email", "password", "zipCode"]);
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    await createUser(req.app.get('db'), req.body)
      .then((dbResponse) => {
        res.status(201).type('json').send(dbResponse);
      })
      .catch((e) => {
        log.error(e);
        if (e.message.includes("ER_DUP_ENTRY")) res.status(400).send("Duplicate entry");
        else
          res.sendStatus(500);
        next(e);
      });
  }
};

const getUser = async (req, res, next) => {
  log.debug("Calling getUser...");
  await getUserByID(req.app.get('db'), req.params.userID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) res.sendStatus(404);
      else res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
};

const patchUser = async (req, res, next) => {
  log.debug("Calling patchUser...Verifying user inputs...");

  let success = true;
  try {
    //check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    //check null values
    errList = inputValidation.getNullorEmpty(res, req.body);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    await updateUserByID(req.app.get('db'), req.params.userID, req.body)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((e) => {
        log.error(e);
        res.sendStatus(500);
        next(e);
      });
  }
}

const deleteUser = async (req, res, next) => {
  log.debug("Calling deleteUser...");

  // UserPet and UserPreference rows are deleted when user is deleted
  await deleteUserByID(req.app.get('db'), req.params.userID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) res.sendStatus(404);
      else if (dbResponse.affectedRows == 1) res.sendStatus(204);
      else {
        log.error(res);
        res.sendStatus(500);
      }
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
}

const putFavorite = async (req, res, next) => {
  log.debug("Calling putFavorite...");

    // Ensure pet exists
    const petsByID = await getPetById(req.app.get('db'), req.params.petID);
    if (petsByID.length !== 1) return res.status(404).send({Error: 'Pet not found'});
  
    try {
      const dbResponse = await addPetToFavorites(req.app.get('db'), req.params.userID, req.params.petID);
      return res.status(201).send(dbResponse);
    } catch (err) {
      log.error(err);
      return res.status(500).send({Error: 'Internal Server Error'});
    }
}

const getFavorites = async (req, res, next) => {
  log.debug('Calling getFavorites...');

  try {
    const dbResponse = await getUserFavorites(req.app.get('db'), req.params.userID);
    // .map will return a simple list, instead of list of single-attribute objects
    return res.status(200).send(dbResponse.map(elem => elem.PetID)); 
  } catch (err) {
    log.error(err);
    return res.status(500).send({Error: 'Internal Server Error'});
  }
}

const deleteFavorite = async (req, res, next) => {
  log.debug('Calling deleteFavorite...');

  try {
    await deleteUserFavorite(req.app.get('db'), req.params.userID, req.params.petID);
    return res.sendStatus(204);
  } catch (err) {
    log.error(err);
    return res.status(500).send({Error: 'Internal Server Error'});
  }
}

const loginUser = async (req, res, next) => {

  // input validation
  let success = true;
  try {
    //check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // all required attributes are provided
    let errList = inputValidation.getMissingAttrs(res, req.body, ["email", "password"]);
    if (errList.length != 0) throw new PropRequiredError(errList);
    //check null values
    errList = inputValidation.getNullorEmpty(res, req.body);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    const { email, password } = req.body;

    await getLoginCredentials(req.app.get('db'), email)
      .then((dbResponse) => {
        if (dbResponse.length !== 1) {
          // There should only ever be one user with the same email and pw
          res.status(401).send('Unauthorized');
        } else if (isCorrectPassword(dbResponse[0].Password, password)) {
          // Create JWT
          const token = jwt.sign(
            {
              userID: dbResponse[0].UserID
            },
            SECRET,
            { expiresIn: '1h' }
          );

          // Return token
          res.send({ token: token });

        } else {
          res.status(401).send('Unauthorized');
        }
      })
      .catch((e) => {
        console.log(e.message);
        res.status(500).send('Server error');
        next(e);
      });
  }
};

module.exports = {
  postUsers,
  getUser,
  patchUser,
  deleteUser,
  putFavorite,
  getFavorites,
  deleteFavorite,
  loginUser
}
