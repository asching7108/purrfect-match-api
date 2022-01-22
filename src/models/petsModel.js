/*
getAllPets
Input: none
Output: list of objects representing all Pets in database
*/
const getAllPets = async () => {
	// TODO: demo data. Replace with response from SQL query
	const allPets = [ { id: 1, name: 'Valley', age: 1 }, { id: 2, name: 'River', age: 4 } ];

	return allPets;
};

module.exports = {
	getAllPets
};
