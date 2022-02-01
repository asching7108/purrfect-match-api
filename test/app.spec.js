const app = require('../src/server');

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });
});

//Shelter
describe('shelters', () => {
  var r = Math.floor(Math.random() * 10000);
	it('POST /shelters responds 201', () => {
		return supertest(app)
			.post('/shelters')
			.send({
        "shelterName": "Shelter 1",
        "address": r + "1 Chicago, IL",
        "emailAddress": r + "Shelter12@email.com",
        "password":"Shelter12345",
        "phoneNumber": "0000000000",
        "website":"website.com"
    })
			.set('Accept', 'application/json')
			.expect(201)
	});

  it('POST /shelters responds 400 (duplicate data)', () => {
		return supertest(app)
			.post('/shelters')
			.send({
        "shelterName": "Shelter 1",
        "address": r + "1 Chicago, IL",
        "emailAddress": r + "Shelter12@email.com",
        "password":"Shelter12345",
        "phoneNumber": "0000000000",
        "website":"website.com"
    })
			.set('Accept', 'application/json')
			.expect(400, "Duplicate entry")
	});

  it('POST /shelters responds 400 (null value)', () => {
		return supertest(app)
			.post('/shelters')
			.send({
        "shelterName": null,
        "address": r + "1 Chicago, IL",
        "emailAddress": r + "Shelter12@email.com",
        "password":"Shelter12345",
        "phoneNumber": "0000000000",
        "website":"website.com"
    })
			.set('Accept', 'application/json')
			.expect(400, "Please provide required input values")
	});

  it('POST /shelters responds 400 (missing attributes)', () => {
		return supertest(app)
			.post('/shelters')
			.send({
        "address": "1 Austin, TX",
        "emailAddress": r + "Austin@email.com",
        "password": r + "Shelter12345",
        "phoneNumber": "0000000000",
        "website":"website.com"
    })
			.set('Accept', 'application/json')
			.expect(400, "Please provide required input attributes")
	});

  it('POST /shelters responds 201 (website = null)', () => {
    return supertest(app)
      .post('/shelters')
      .send({
        "shelterName": "Shelter Tokyo",
        "address": r + "1234 Tokyo, Japan",
        "emailAddress": r + "Shelter12@email.com",
        "password":"Shelter12345",
        "phoneNumber": "0000000000",
        "website":null
    })
      .set('Accept', 'application/json')
      .expect(201)
  });

  it('POST /shelters responds 201 (missing website attribute)', () => {
		return supertest(app)
			.post('/shelters')
			.send({
        "shelterName": "Shelter Portland1",
        "address": r + "1 Portland, OR",
        "emailAddress": r + "Shelter12@email.com",
        "password":"Shelter12345",
        "phoneNumber": "0000000000",
    })
			.set('Accept', 'application/json')
			.expect(201)
	});
 });

