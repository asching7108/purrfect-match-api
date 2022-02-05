const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

const db = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const devDb = mysql.createPool({
  host: dbConfig.DEV_HOST,
  port: dbConfig.DEV_PORT,
  user: dbConfig.DEV_USER,
  password: dbConfig.DEV_PASSWORD,
  database: dbConfig.DEV_DB
});

module.exports = {
  db,
  devDb
};
