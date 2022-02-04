module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  SECRET: 'aBadSecret' // TODO: replace before deploying to production
};