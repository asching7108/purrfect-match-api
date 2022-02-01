const db = require("../models/db.js");

//Useful tool for generating sql query class
class SqlUtil {
  constructor(str) {
    this.str = str;
  }

  /**
   * Returns input with single quotes (SQ).
   * @param {any} input Takes string, int, datetime
   * @return {string} Example: '2022-01-01'
   */
  static SQ(input) {
    if (input == null) return null;

    if (typeof input == typeof 0) return "'" + db.escape(input) + "'";
    else if (input instanceof Date) return "'" + db.escape(input).toISOString().split('T')[0] + "'";
    else return "'" + db.escape(input) + "'";
  }
}

//Useful tool for validating user inputs
class inputValidation {
  
/**
   * Checks content type
   * @param {req} req response
   * @param {res} res User input parameter
   * @return {boolean} If error, send status code, error message and return false.
   */
  static checkContentType(req, res){
    var contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
      res.sendStatus(415);
      return false;
    }
    else return true;
  }

  /**
   * Checks if json contains null value or not
   * @param {res} res response
   * @param {JSON} json User input parameter
   * @param {Array} exceptions Nullable exceptions.
   * @return {boolean} If error, send status code, error message and return false.
   */
  static checkNullorEmpty(res, json, exceptions = []) {

    var errList = [];
    Object.keys(json).forEach(function (key) {
      if (!exceptions.includes(key) && (!json[key] || json[key] == "")) errList.push(key);
    })
    
    if(errList.length != 0) {
      res.status(400).send({'ERROR':'[' + errList + '] cannot be null or empty.'});
      return false;
    }
    return true;
  }

  /**
   * Checks all attrs are provided or not
   * @param {res} res response
   * @param {JSON} json User input parameter
   * @param {Array} attrs expected attrs.
   * @return {boolean} If error, send status code, error message and return false.
   */
  static checkAttrs(res, json, attrs) {
    var arr = JSON.parse(JSON.stringify(attrs));
    Object.keys(json).forEach(function (key) {
      const index = arr.indexOf(key);
      if (index > -1) {
        arr.splice(index, 1);
      }
    })

    if(arr.length != 0) {
      res.status(400).send({'ERROR':'Missing required attributes. Expected=[' + attrs + '], Recieved=[' + Object.keys(json) + ']'});
      return false;
    }
    return true;
  }
}
module.exports = {
  SqlUtil,
  inputValidation
};
