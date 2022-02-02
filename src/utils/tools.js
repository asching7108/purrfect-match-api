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
   * Checks if json contains null value or not
   * @param {JSON} json User input parameter
   * @param {Array} exceptions Nullable exceptions.
   * @return {boolean} If Json includes null, return true.
   */
  static includesNullorEmpty(json, exceptions = []) {

    var result = false;
    Object.keys(json).forEach(function (key) {
      if (!exceptions.includes(key) && (!json[key] || json[key] == "")) result = true;
    })
    return result;
  }

  /**
   * Checks all attrs are provided or not
   * @param {JSON} json User input parameter
   * @param {Array} attrs expected attrs.
   * @return {boolean} all expected attrs are provided, return true.
   */
  static hasAllAttrs(json, attrs) {
    var arr = attrs
    Object.keys(json).forEach(function (key) {
      const index = arr.indexOf(key);
      if (index > -1) {
        arr.splice(index, 1);
      }
    })
    return arr.length == 0;
  }
}
module.exports = {
  SqlUtil,
  inputValidation
};
