const express = require('express');

const router = express.Router();
const db = require('../../database/db');
const categories = ['portrait', 'landscape', 'aerial', 'street'];

async function getPhotosForSwiper(category, index, amount) {
  const info = { category, amount, index };
  console.log(info);
  const photosFromDB = await db.getPhotosFromIndex(info);
  if (photosFromDB.status === false) {
    console.log('Error in getting photos for PS');
  } else if (photosFromDB) {
    console.log(`Recieved ${photosFromDB.length} images for PS`);
    return photosFromDB;
  } else {
    console.log('error in retrieving photos for PS!');
  }
  return null;
}

async function getLatestUserAffinities(userId) {
  const info = { userId };
  const userAffinitiesFromDB = await db.getLastSeenImages(info);
  if (!userAffinitiesFromDB) {
    console.log('Error in getting photos for PS');
  } else if (userAffinitiesFromDB) {
    console.log(`Recieved ${userAffinitiesFromDB.length} affinities for PS`);
    return userAffinitiesFromDB;
  } else {
    console.log('error in retrieving photos for PS!');
  }
  return null;
}

router
  .get('/', (req, res) => {
    console.log(req.params);
    res.send('You have reached the users route, supply ID and authentication to continue');
  })
  .get('/:id', (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    res.send({ 'Getting PhotoSwiper Data for user': req.params.id });
  })
  .get('/:id/getphotos', async (req, res) => {
    const userId = await req.session.key || req.params.id;
    const promises = [];
    // get last seen images from liked table for each category
    // will have an object with categories and indexes
    const userData = await getLatestUserAffinities(userId);
    console.log(userData);
    // res.status(200).send(userData);
    userData.forEach(async (userAffinty) => {
      const category = categories[userAffinty.category - 1];
      const promise = await getPhotosForSwiper(category, userAffinty.indexlastseen, 5);
      promises.push(promise);
    });
    // can we rewritten with a HOF for a dynamic amount of categories
    // const one = await getPhotosForSwiper('portrait', 1, 5);
    // const two = await getPhotosForSwiper('landscape', 20, 5);
    // const three = await getPhotosForSwiper('aerial', 30, 5);
    // const four = await getPhotosForSwiper('street', 40, 5);
    // promises.push(one, two, three, four);
    // res.status(200).send(userData);
    Promise.all(promises)
      .then((allImages) => {
        console.log('Promises fullfilled, resulting with: ', allImages);
        res.status(200).send(allImages);
      })
      .catch((e) => {
        console.log('there were errors ==>', e);
        res.status(400).send({ status: false });
      });
  });

module.exports = router;
