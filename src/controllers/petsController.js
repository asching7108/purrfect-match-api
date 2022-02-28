const nodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
const petsModel = require('../models/petsModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { Logger } = require("../utils/log4js.js");
const log = Logger();

const options = {
  provider: 'openstreetmap'
};

const geocoder = nodeGeocoder(options);

const getLatLng = async (address) => {
  return (await geocoder.geocode({ q: address, country: 'US' }))[0];
};

const getLatLngByZipCode = async (zipCode) => {
  return (await geocoder.geocode({ postalcode: zipCode, country: 'US' }))[0];
};

const getBatchLatLng = async (list) => {
  return (await geocoder.batchGeocode(list.map(address => { return { q: address, country: 'US' }})))
    .map(res => res.error ? '' : res.value[0]);
};

const getDistance = (start, end) => {
  const distanceInMeter = geolib.getDistance(
    { latitude: start.latitude, longitude: start.longitude },
    { latitude: end.latitude, longitude: end.longitude }
  )
  return Math.round(geolib.convertDistance(distanceInMeter, 'mi'));
};

const {
  retrievePets,
  createNewPet,
  getPetById,
  deletePetById,
  updatePetById,
  getAllNews,
  createPetNews,
  getPetNewsByPetId,
  deletePetNewsById,
  getAllBreeds
} = petsModel;

const requiredFields = [
  'typeOfAnimal',
  'breed',
  'sex',
  'size',
  'shelterID',
  'picture',
  'availability',
  'goodWithOtherAnimals',
  'goodWithChildren',
  'mustBeLeashed',
  'neutered',
  'vaccinated',
  'houseTrained',
  'description'
];

const optionalFields = [
  'name',
  'age'
];

const getPets = async (req, res, next) => {
  log.debug("Calling getPets...");
  await retrievePets(req.app.get('db'), req.query)
    .then(async (dbResponse) => {
      log.debug("Calculates pet distances...");
      const { distance, zipCode, address } = req.query;

      // if not filtered by distance, returns the result directly
      if (!distance || (!address && !zipCode)) {
        return res.send(dbResponse);
      }

      // gets the lat/lng location of the query
      let latLng;
      if (address) latLng = await getLatLng(address);
      if (!latLng) latLng = await getLatLngByZipCode(zipCode);

      // lat/lng location not found
      if (!latLng) {
        return res.send(dbResponse);
      }

      // gets the lat/lng locations and distances of each pet
      const petsLatLng = await getBatchLatLng(dbResponse.map(pet => pet.Address));
      dbResponse = dbResponse.map((pet, i) => {
        pet.distance = petsLatLng[i] ? getDistance(latLng, petsLatLng[i]) : 9999;
        return pet;
      });

      // filters the result by distance
      dbResponse = dbResponse.filter(pet => pet.distance <= distance);

      res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const postPet = async (req, res, next) => {
  log.debug("Calling postPets...Verifying user inputs...");

  try {
    // check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check all attrs are provided (input validation)
    let errList = inputValidation.getMissingAttrs(res, req.body, requiredFields)
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body, optionalFields);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode).json({ error: err.message });
  }

  await createNewPet(req.app.get('db'), req.body)
    .then((dbResponse) => {
      res.status(201).send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const getPet = async (req, res, next) => {
  log.debug("Calling getPet...");
  await getPetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      res.send(dbResponse[0]);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const deletePet = async (req, res, next) => {
  log.debug("Calling deletePet...");
  await deletePetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      res.sendStatus(204);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const patchPet = async (req, res, next) => {
  log.debug("Calling patchPets...Verifying user inputs...");
  const { petID } = req.params;

  try {
    // check content type
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check shelterID is provided (only required attribute for PATCH)
    let errList = inputValidation.getMissingAttrs(res, req.body, ['shelterID']);
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body, optionalFields);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // verify that petID exists and get original values first
  await getPetById(req.app.get('db'), petID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      updatePetById(req.app.get('db'), petID, req.body, dbResponse[0])
        .then((dbResponse) => {
          if (dbResponse.affectedRows == 0) {
            return res.status(400).json({ error: "Bad request." });
          }
          res.sendStatus(200);
        })
        .catch((e) => {
          log.error(e);
          res.status(500).json({ error: e.message });
          next(e);
        });
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const getNews = async (req, res, next) => {
  log.debug("Calling getNews...");
  await getAllNews(req.app.get('db'))
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

const postPetNews = async (req, res, next) => {
  log.debug("Calling postPetNews...Verifying user inputs...");

  try {
    // check content type
    if(!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
    // check all attrs are provided (input validation)
    let errList = inputValidation.getMissingAttrs(res, req.body, ['newsItem'])
    if (errList.length != 0) throw new PropRequiredError(errList);
    // check null values
    errList = inputValidation.getNullorEmpty(res, req.body);
    if (errList.length != 0) throw new PropNullorEmptyError(errList);
  } catch (err) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // verify that petID exists first
  const { petID } = req.params;
  await getPetById(req.app.get('db'), petID)
  .then((dbResponse) => {
    if (dbResponse.length == 0) {
      return res.status(404).json({ error: "Pet not found." });
    }
    createPetNews(req.app.get('db'), petID, req.body.newsItem)
      .then((dbResponse) => {
        res.status(201).send(dbResponse);
      })
      .catch((e) => {
        log.error(e);
        res.status(500).json({ error: e.message });
        next(e);
      });
  })
  .catch((e) => {
    log.error(e);
    res.status(500).json({ error: e.message });
    next(e);
  });
};

const getPetNews = async (req, res, next) => {
  log.debug("Calling getPetNews...");
  // verify that petID exists first
  const { petID } = req.params;
  await getPetById(req.app.get('db'), petID)
  .then((dbResponse) => {
    if (dbResponse.length == 0) {
      return res.status(404).json({ error: "Pet not found." });
    }
    getPetNewsByPetId(req.app.get('db'), petID)
      .then((dbResponse) => {
        res.send(dbResponse);
      })
      .catch((e) => {
        log.error(e);
        res.status(500).json({ error: e.message });
        next(e);
      });
  })
  .catch((e) => {
    log.error(e);
    res.status(500).json({ error: e.message });
    next(e);
  });
};

const deletePetNews = async (req, res, next) => {
  log.debug("Calling deletePetNews...");
  // verify that petID exists first
  const { petID, newsItemID } = req.params;
  await getPetById(req.app.get('db'), petID)
  .then((dbResponse) => {
    if (dbResponse.length == 0) {
      return res.status(404).json({ error: "Pet not found." });
    }
    deletePetNewsById(req.app.get('db'), newsItemID)
      .then((dbResponse) => {
        if (dbResponse.affectedRows == 0) {
          return res.status(404).json({ error: "News item not found." });
        }
        res.sendStatus(204);
      })
      .catch((e) => {
        log.error(e);
        res.status(500).json({ error: e.message });
        next(e);
      });
  })
  .catch((e) => {
    log.error(e);
    res.status(500).json({ error: e.message });
    next(e);
  });
};

const getBreeds = async (req, res, next) => {
  log.debug("Calling getBreeds...");
  await getAllBreeds(req.app.get('db'))
    .then((dbResponse) => {
      res.send(dbResponse);
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });
};

module.exports = {
  getPets,
  postPet,
  getPet,
  deletePet,
  patchPet,
  getNews,
  postPetNews,
  getPetNews,
  deletePetNews,
  getBreeds
};
