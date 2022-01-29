//Useful tool for generating sql query class
class SqlUtil {
    constructor(str){
        this.str = str;
    }

    /**
     * Returns input with single quates (SQ).
     * @param {any} input Takes string, int, datetime
     * @return {string} Example: '2022-01-01'
     */
    static SQ(input){
        if (typeof input == typeof 0) return "'" + input + "'";
        else if (input instanceof Date) return "'" + input.toISOString().split('T')[0] + "'";
        else return "'" + input + "'";
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
    static includesNullorEmpty(json, exceptions = []){       

        var result = false;
        Object.keys(json).forEach(function(key) {
            if (!exceptions.includes(key) && (!json[key] || json[key] == "")) result = true;
        })
        return result;
    }

    /**
     * heck all attrs are provided or not
     * @param {JSON} json User input parameter
     * @param {Array} attrs expected attrs.
     * @return {boolean} If Json includes null, return true.
     */
    static hasAllAttrs(json, attrs){
        var arr = attrs
        Object.keys(json).forEach(function(key) {
            arr.pop(key)
        })
        return arr.length == 0;
    }
}
module.exports = {
    SqlUtil,
    inputValidation
};
