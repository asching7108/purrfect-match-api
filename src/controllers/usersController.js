const jwt = require('jsonwebtoken');
const {
  verifyLoginCredentials,
  updateUserSession
} = require('../models/usersModel');
const { SECRET } = require('../config');
const { inputValidation } = require('../utils/tools');

const login = async (req, res, next) => {

  // input validation
  var attrs = ["email", "password"];
  var contype = req.headers['content-type'];
  if (!contype || contype.indexOf('application/json') !== 0) res.sendStatus(415);
  else if (!inputValidation.hasAllAttrs(req.body, attrs)) res.status(400).send("Please provide required input attributes");
  else if (inputValidation.includesNullorEmpty(req.body)) res.status(400).send("Please provide required input values");
  else {
    const { email, password } = req.body;

    await verifyLoginCredentials(email, password)
      .then((dbResponse) => {

        // Verify email and password
        if (dbResponse.length !== 1) {
          // There should only ever be one user with the same email and pw
          res.status(401).send('Unauthorized');
        } else {
          const userID = dbResponse[0].UserID;

          // Create unique session ID (aka jwt)
          const token = jwt.sign(
            {
              data: email
            },
            SECRET,
            { expiresIn: '1h' }
          );

          // Save to DB
          saveUserToken(userID, token).then(() => {
            // Return token
            res.send({ token: token });
          });
        }
      })
      .catch((e) => {
        console.log(e.message);
        res.status(500).send('Server error');
        next(e);
      });
  }
};

const saveUserToken = async (userID, token) => {
  await updateUserSession(userID, token).catch((e) => {
    console.log(e.message);
    res.sendStatus(500);
    next(e);
  });
};

module.exports = {
  login
};
