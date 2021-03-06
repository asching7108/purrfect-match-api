const nodeGeocoder = require('node-geocoder');
const geolib = require('geolib');
const petsModel = require('../models/petsModel.js');
const { inputValidation } = require("../utils/tools.js");
const { ContentTypeError, PropNullorEmptyError, PropRequiredError } = require("../utils/errors.js");
const { Logger } = require("../utils/log4js.js");
const log = Logger();
const fs = require('fs')
const DIR = './public/'

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
  return (await geocoder.batchGeocode(list.map(address => { return { q: address, country: 'US' } })))
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
      const { distance, zipCode } = req.query;

      // only performs the calculation if a distance and a zip code is specified
      if (!distance || !zipCode) {
        return res.send(dbResponse);
      }

      // gets the lat/lng location
      const latLng = await getLatLngByZipCode(zipCode);

      // if lat/lng location not found, returns an empty list
      if (!latLng) {
        return res.send([]);
      }

      // gets the lat/lng locations and distances of each shelter
      const shelters = {};
      dbResponse.map(pet => {
        if (!shelters[pet.ShelterID]) {
          shelters[pet.ShelterID] = pet.Address;
        }
      });
      for (const shelterID in shelters) {
        let shelterLatLng = await getLatLng(shelters[shelterID]);
        if (!shelterLatLng) {
          const shelterZipCode = Number(shelters[shelterID].slice(-5));
          if (Number.isInteger(shelterZipCode)) {
            shelterLatLng = await getLatLngByZipCode(shelterZipCode);
          }
        }
        // gets the distance between the given zip code and the shelter
        shelters[shelterID] = shelterLatLng ? getDistance(latLng, shelterLatLng) : null;
      }

      dbResponse = dbResponse.map(pet => {
        pet.Distance = shelters[pet.ShelterID];
        return pet;
      });

      dbResponse = dbResponse.filter(pet => pet.Distance !== null && pet.Distance <= distance);
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

  //get image path
  let path;
  await getPetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.length == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      path = dbResponse[0].Picture
    })
    .catch((e) => {
      log.error(e);
      res.status(500).json({ error: e.message });
      next(e);
    });

  await deletePetById(req.app.get('db'), req.params.petID)
    .then((dbResponse) => {
      if (dbResponse.affectedRows == 0) {
        return res.status(404).json({ error: "Pet not found." });
      }
      removeImageFile(path)
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

      let oldImagePath = dbResponse[0].Picture
      updatePetById(req.app.get('db'), petID, req.body, dbResponse[0])
        .then((dbResponse) => {
          if (dbResponse.affectedRows == 0) {
            return res.status(400).json({ error: "Bad request." });
          }
          //delete old image path
          if (oldImagePath !== req.body.picture) removeImageFile(oldImagePath)

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
  await getAllNews(req.app.get('db'), req.query)
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
    if (!inputValidation.checkContentType(req, res)) throw new ContentTypeError();
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

const removeImageFile = (path) => {
  let fullpath = DIR + path.replace('images', '');
  fs.unlink(fullpath, (err) => {
    if (err) {
      log.error(err)
      return
    }
    log.debug("Image File is removed.")
  })
}

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
  getBreeds,
  removeImageFile
};
