const app = require('../src/server');

describe('App', () => {
	it('GET / responds with 200 containing "Hello, world!"', () => {
		return supertest(app)
			.get('/')
			.expect(200, 'Hello, world!');
	});
});

//Shelter -- can't really test well because postShelters is async function
var r = Math.floor(Math.random() * 10000);

var json = {
	"shelterName": "Shelter " + r,
	"address": r + " Dallas, Tx",
	"emailAddress": r + "Shelter@email.com",
	"password": "Shelter" + r,
	"phoneNumber": "0000000000",
	"website": "www.test.com"
}
// describe('shelters 1', () => {
// 	it('POST /shelters responds 201', () => {
// 		return supertest(app)
// 			.post('/shelters')
// 			.send(json)
// 			.set('Accept', 'application/json')
// 			.expect(201)
// 	});
//  });

// describe('shelters 2', () => {
// 	it('POST /shelters responds 400 (duplicate data)', () => {
// 		return supertest(app)
// 			.post('/shelters')
// 			.send(json)
// 			.set('Accept', 'application/json')
// 			.expect(400, "Duplicate entry")
// 	});
// });

// describe('shelters 3', () => {
// 	json["shelterName"] = null;
// 	it('POST /shelters responds 400 (null value)', () => {
// 		return supertest(app)
// 			.post('/shelters')
// 			.send(json)
// 			.set('Accept', 'application/json')
// 			.expect(400, "Please provide required input values")
// 	});
// });
// describe('shelters 4', () => {
// 	delete json["shelterName"];
// 	it('POST /shelters responds 400 (missing attribute)', () => {
// 		return supertest(app)
// 			.post('/shelters')
// 			.send(json)
// 			.set('Accept', 'application/json')
// 			.expect(400, "Please provide required input attributes")
// 	});
// });
describe('shelters 5', () => {
	r = Math.floor(Math.random() * 10000);
	json["address"] = r + " Austin, Tx";
	json["website"] = null;
	it('POST /shelters responds 201 (website = null)', () => {
		return supertest(app)
			.post('/shelters')
			.send(json)
			.set('Accept', 'application/json')
			.expect(201)
	});
});
// describe('shelters 6', () => {
// 	r = Math.floor(Math.random() * 10000);
// 	json["address"] = r + " Houston, Tx";
// 	delete json["website"];
// 	it('POST /shelters responds 201 (missing website attribute)', () => {
// 		return supertest(app)
// 			.post('/shelters')
// 			.send(json)
// 			.set('Accept', 'application/json')
// 			.expect(201)
// 	});
// });
