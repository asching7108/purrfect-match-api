const login = async (req, res, next) => {
	res.send({ token: 'test123' });
};

module.exports = {
	login
};
