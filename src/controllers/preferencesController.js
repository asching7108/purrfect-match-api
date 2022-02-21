const {
  createPreference,
  getAllUserPreferences,
  deletePreferenceByID,
  deletePreferencesByUserID
} = require('../models/preferencesModel');

const { inputValidation } = require('../utils/tools');
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const postPreference = async (req, res, next) => {
  log.debug("Calling postPreference...Verifying inputs...");
  let success = true;
  try {
    // content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // all required attributes are provided
    let errList = inputValidation.getMissingAttrs(res, req.body, ["type", "selection"]);
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    success = false;
    res.status(err.statusCode).send(err.message);
  }

  if (success) {
    const userID = req.params.userID;
    await createPreference(req.app.get('db'), userID, req.body)
      .then((dbResponse) => {
        res.status(201).type('json').send(dbResponse);
      })
      .catch((e) => {
        log.error(e);
        res.sendStatus(500);
        next(e);
      });
  }
};

const getUserPreferences = async (req, res, next) => {
  log.debug("Calling getUserPreferences...Verifying inputs not necessary.");
  const userID = req.params.userID;
  await getAllUserPreferences(req.app.get('db'), userID)
    .then((dbResponse) => {
      res.status(200).send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
}

const deletePreference = async (req, res, next) => {
  log.debug("Calling deletePreference...");

  await deletePreferenceByID(req.app.get('db'), req.params.preferenceID)
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

const deleteAllUserPreferences = async (req, res, next) => {
  await deletePreferencesByUserID(req.app.get('db'), req.params.userID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) res.sendStatus(404);
      else res.sendStatus(204);
    })
    .catch((e) => {
      log.error(e);
      res.sendStatus(500);
      next(e);
    });
}

module.exports = {
  postPreference,
  getUserPreferences,
  deletePreference,
  deleteAllUserPreferences
}
