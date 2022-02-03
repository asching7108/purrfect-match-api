// middleware that checks required authentication
function requireAuth(req, res, next) {
  //Invalid auth response example:
  //return res.status(401).json({ error: 'Unauthorized request' });
  next();
}

module.exports = { requireAuth };
