module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SECRET: 'notASecret' // A secret is required by jsonwebtoken, but is not used by react-jwt
};