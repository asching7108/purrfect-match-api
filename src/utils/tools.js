//Useful tool for generating sql query class
class SqlUtil {
    constructor(str){
        this.str = str;
    }

    /**
     * Returns input with single quates.
     * @param {any} input Takes string, int, datetime
     * @return {string} Example: '2022-01-01'
     */
    static Quote(input){
        if (typeof input == typeof 0) return "'" + input + "'";
        else if (input instanceof Date) return "'" + input.toISOString().split('T')[0] + "'";
        else return "'" + input + "'";
    }
}

//Useful tool for validating user inputs
class inputValidation {
    constructor(json, exceptions){
        this.json = json;
        this.exceptions = exceptions;
    }

    /**
     * Checks if json contains null value or not
     * @param {JSON} json User input parameter
     * @param {Array} exceptions Nullable exceptions.
     * @return {number} If Json includes null, return true.
     */
    static includesNullorEmpty(json, exceptions = []){       

        var result = false;
        Object.keys(json).forEach(function(key) {
            if (!exceptions.includes(key) && (!json[key] || json[key] == "")) result = true;
        })
        return result;
    }
}
module.exports = {
    SqlUtil,
    inputValidation
};