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
     * @param {req} req request
     * @param {res} res User input parameter
     * @return {boolean} If error, return false.
     */
  static checkContentType(req, res) {
    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
      return false;
    }
    else return true;
  }

  /**
   * Checks if json contains null value or not
   * @param {res} res response
   * @param {JSON} json User input parameter
   * @param {Array} exceptions Nullable exceptions.
   * @return {Array} return null or empty items
   */
  static getNullorEmpty(res, json, exceptions = []) {
    let errList = [];
    Object.keys(json).forEach(function (key) {
      if (!exceptions.includes(key) && (json[key] == null || json[key] === "")) errList.push(key);
    })
    return errList;
  }

  /**
   * Checks all attrs are provided or not
   * @param {res} res response
   * @param {JSON} json User input parameter
   * @param {Array} expected expected attrs.
   * @return {Array} return missing attributes
   */
  static getMissingAttrs(res, json, expected) {

    let arr = JSON.parse(JSON.stringify(expected));
    Object.keys(json).forEach(function (key) {
      const index = arr.indexOf(key);
      if (index > -1) {
        arr.splice(index, 1);
      }
    })
    return arr;
  }

}
module.exports = {
  SqlUtil,
  inputValidation
};
