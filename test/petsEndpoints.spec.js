const app = require('../src/server');
const { devDb } = require("../src/models/db.js");

function makeTestPet() {
  return {
    "name": "Goofy",
    "typeOfAnimal": "Cat",
    "breed": "American Shorthair",
    "sex": "Male",
    "age": 2,
    "size": "Small, 11lbs",
    "shelterID": 1,
    "picture": "test",
    "availability": "Available",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit facilisis elit, id volutpat dolor porttitor sed. Proin erat diam, venenatis ac lacinia a, condimentum ac turpis. Fusce eu nisl tempor, feugiat neque vitae, tincidunt est.",
    "goodWithOtherAnimals": 1,
    "goodWithChildren": 1,
    "mustBeLeashed": 0,
    "neutered": 1,
    "vaccinated": 1,
    "houseTrained": 1
  };
}

describe('pets', () => {

  before('set db instance', () => {
    app.set('db', devDb);
  })

  it('GET /pets responds 200', () => {
    return supertest(app)
      .get('/pets')
      .expect(200);
  });

  it('POST /pets responds 201', () => {
    const testPet = makeTestPet();
    return supertest(app)
      .post('/pets')
      .send({ 'newPet': testPet })
      .set('Content-Type', 'application/json')
      .expect(201)
  });

  it('POST /pets responds 400 (null value)', () => {
    const testPet = makeTestPet();
    testPet.typeOfAnimal = null;
    return supertest(app)
      .post('/pets')
      .send({ 'newPet': testPet })
      .set('Content-Type', 'application/json')
      .expect(400, '[typeOfAnimal] cannot be null or empty.')
  });

  it('POST /pets responds 400 (missing attributes)', () => {
    const testPet = makeTestPet();
    delete testPet.typeOfAnimal;
    return supertest(app)
      .post('/pets')
      .send({ 'newPet': testPet })
      .set('Content-Type', 'application/json')
      .expect(400, 'Missing required attributes = [typeOfAnimal]')
  });

  it('POST /pets responds 201 (age = null)', () => {
    const testPet = makeTestPet();
    testPet.age = null;
    return supertest(app)
      .post('/pets')
      .send({ 'newPet': testPet })
      .set('Content-Type', 'application/json')
      .expect(201)
  });

  it('POST /pets responds 201 (missing age attribute)', () => {
    const testPet = makeTestPet();
    delete testPet.age;
    return supertest(app)
      .post('/pets')
      .send({ 'newPet': testPet })
      .set('Content-Type', 'application/json')
      .expect(201)
  });

  it('POST /pets responds 415 (incorrect content-type)', () => {
    return supertest(app)
      .post('/pets')
      .send('newPet: new pet')
      .set('Content-Type', 'text')
      .expect(415, "Incorrect content-type.")
  });

  it('GET /pets/:petID responds 200', () => {
    return supertest(app)
      .get('/pets/1')
      .expect(200);
  });

  it('GET /pets/:petID responds 404', () => {
    return supertest(app)
      .get('/pets/999999999')
      .expect(404);
  });

  it('DELETE /pets/:petID responds 204', () => {
    return supertest(app)
      .delete('/pets/4')
      .expect(204);
  });

  it('DELETE /pets/:petID responds 404', () => {
    return supertest(app)
      .delete('/pets/999999999')
      .expect(404);
  });

  it('PATCH /pets/:petID responds 200', () => {
    const testPet = makeTestPet();
    testPet.typeOfAnimal = "Dog";
    return supertest(app)
      .patch('/pets/3')
      .send({ 'petToUpdate': testPet })
      .expect(200)
  });

  it('PATCH /pets responds 400 (null value)', () => {
    const testPet = makeTestPet();
    testPet.typeOfAnimal = null;
    return supertest(app)
      .patch('/pets/3')
      .send({ 'petToUpdate': testPet })
      .set('Content-Type', 'application/json')
      .expect(400, '[typeOfAnimal] cannot be null or empty.')
  });

  it('PATCH /pets responds 400 (missing attributes)', () => {
    const testPet = makeTestPet();
    delete testPet.typeOfAnimal;
    return supertest(app)
      .patch('/pets/3')
      .send({ 'petToUpdate': testPet })
      .set('Content-Type', 'application/json')
      .expect(400, 'Missing required attributes = [typeOfAnimal]')
  });

  it('PATCH /pets responds 415 (incorrect content-type)', () => {
    return supertest(app)
      .patch('/pets/3')
      .send('petToUpdate: new pet')
      .set('Content-Type', 'text')
      .expect(415, "Incorrect content-type.")
  });
});
