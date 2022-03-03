const app = require('../src/server');
const { devDb } = require("../src/models/db.js");

//Shelter
//To test, drop all the tables and run sampleDataQueries.sql (you should probably do it in your localhost database)
describe('shelters', () => {

  let r = Math.floor(Math.random() * 10000);

  before('set db instance', () => {
    app.set('db', devDb);
  })

  it('POST /shelters responds 201', () => {
    return supertest(app)
      .post('/shelters')
      .send({
        "shelterName": "Shelter 1",
        "address": r + "1 Chicago, IL",
        "emailAddress": r + "Shelter12@email.com",
        "password": "Shelter12345",
        "phoneNumber": "0000000000",
        "website": "website.com"
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
        "password": "Shelter12345",
        "phoneNumber": "0000000000",
        "website": "website.com"
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
        "password": "Shelter12345",
        "phoneNumber": "0000000000",
        "website": "website.com"
      })
      .set('Accept', 'application/json')
      .expect(400, '[shelterName] cannot be null or empty.')
  });

  it('POST /shelters responds 400 (missing attributes)', () => {
    return supertest(app)
      .post('/shelters')
      .send({
        "address": "1 Austin, TX",
        "emailAddress": r + "Austin@email.com",
        "password": r + "Shelter12345",
        "phoneNumber": "0000000000",
        "website": "website.com"
      })
      .set('Accept', 'application/json')
      .expect(400, 'Missing required attributes = [shelterName]')
  });

  it('POST /shelters responds 201 (website = null)', () => {
    return supertest(app)
      .post('/shelters')
      .send({
        "shelterName": "Shelter Tokyo",
        "address": r + "1234 Tokyo, Japan",
        "emailAddress": r + "Shelter12@email.com",
        "password": "Shelter12345",
        "phoneNumber": "0000000000",
        "website": null
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
        "password": "Shelter12345",
        "phoneNumber": "0000000000",
      })
      .set('Accept', 'application/json')
      .expect(201)
  });

  it('POST /shelters responds 415 (incorrect content-type)', () => {
    return supertest(app)
      .post('/shelters')
      .send(
        "shelterName:Shelter Portland1"
      )
      .set('content-type', 'text')
      .expect(415, "Incorrect content-type.")
  });

  it('GET /shelters/:shelterID responds 200', () => {
    return supertest(app)
      .get('/shelters/1') //<--change it shelterID the database doesn't have it
      .expect(200);
  });

  it('GET /shelters/:shelterID responds 404', () => {
    return supertest(app)
      .get('/shelters/999999999')
      .expect(404);
  });

  it('PATCH /shelters/:shelterID responds 200', () => {
    return supertest(app)
      .patch('/shelters/1') //<--change shelterID if the database doesn't have it
      .send(
        {
          "shelterName": "Updated 1",
          "emailAddress": "Updated@email.com",
          "password": "Updated12345",
          "website": "www.Updated.com"
        }
      )
      .expect(200)
  });

  it('PATCH /shelters/:shelterID responds 500', () => {
    return supertest(app)
      .patch('/shelters/999999')
      .send(
        {
          "shelterName": "Updated 1",
          "emailAddress": "Updated@email.com",
          "password": "Updated12345",
          "website": "www.Updated.com"
        }
      )
      .expect(500)
  });

  it('DELETE /shelters/:shelterID responds 204', () => {
    return supertest(app)
      .delete('/shelters/1') //<--change shelterID if the database doesn't have it
      .expect(204);
  });

  it('DELETE /shelters/:shelterID responds 404', () => {
    return supertest(app)
      .delete('/shelters/999999999')
      .expect(404);
  });

  it('GET /shelters/2/pets responds 200', () => {
    return supertest(app)
      .get('/shelters/2/pets') //<--change shelterID if the database doesn't have it
      .expect(200);
  });

  it('GET /shelters/3/pets no pet data responds 200', () => {
    return supertest(app)
      .get('/shelters/3/pets') //<--change shelterID if the database doesn't have it
      .expect(200, []);
  });

  it('GET /shelters/9999/pets no shelter 404', () => {
    return supertest(app)
      .get('/shelters/9999/pets') //<--change shelterID if the database doesn't have it
      .expect(404, "Shelter not found");
  });
});
