const jwt = require('jsonwebtoken');
const {
	verifyLoginCredentials,
	updateUserSession
} = require('../models/usersModel');

const login = async (req, res, next) => {
	const { email, password } = req.body;

	await verifyLoginCredentials(email, password)
		.then((dbResponse) => {

			// Verify email and password
			if (dbResponse.length !== 1) {
				// There should only ever be one user with the same email and pw
				res.status(400).send('Bad Request');
			}

			const userID = dbResponse[0].UserID;

			// Create unique session ID (aka jwt)
			const token = jwt.sign(
				{
					data: email
				},
				'notASecret',
				{ expiresIn: '1h' }
			);

			// Save to DB
			saveUserToken(userID, token).then(() => {
				// Return token
				res.send({ token: token });
			});
		})
		.catch((e) => {
			console.log(e.message);
			res.status(500).send('Server error');
			next(e);
		});
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
