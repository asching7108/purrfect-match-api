const db = require("./db.js");


const getAllShelters = async (params) => {
    const sql = `SELECT * FROM Shelter`;
    await db.query(sql, (err, res) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
        console.log(res);
        return res
      });

      console.log("result=" +result)
    
}

module.exports = {
	getAllShelters
};
