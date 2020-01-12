const express = require('express');
const db = require('../../database/db');
const { recommendationGenerator } = require('../../helpers/recommendations');

const router = express.Router();

router
  .get('/', (req, res) => {
    console.log(req.params);
    res.send('You have reached the users route, supply ID and authentication to continue');
  })
  .get('/:id', (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    res.send({ 'Getting data for user': req.params.id });
  })
  .get('/:id/likedphotos', async (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    const userId = await req.session.key || req.params.id;
    const getUserLikedPhotos = async () => {
      const likedPhotos = await db.getUserLikes({ userId });
      if (likedPhotos === null) {
        console.log('User has no likes');
      // res.status(400).send({status: false});
        res.status(200).send(JSON.stringify([]));
      } else if (likedPhotos) {
        console.log('user has likes=>', likedPhotos.length);
        if (likedPhotos && likedPhotos.length > 0) {
          res.status(200).send(JSON.stringify(likedPhotos));
        } else {
          res.status(200).send(JSON.stringify([]));
        }
      } else {
        console.log('error in retrieving liked photos!');
      }
    };
    await getUserLikedPhotos(userId);
  })
  .get('/:id/:mount/recommendations', async (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    try {
      const userId = await req.session.key || req.params.id;
      const mountId = await req.params.mount;
      const allPhotoAffinities = await db.getUserRecommendations({ userId });
      const recommendationResults = await recommendationGenerator(allPhotoAffinities, mountId);
      if (allPhotoAffinities === null) {
        console.log('User has no affinity data');
      } else if (allPhotoAffinities) {
        // console.log('data came back, calling with mountId: ', mountId);
        res.status(200).send(recommendationResults);
      } else {
        console.log('error in retrieving photo affinities1!');
      }
    } catch (err) {
      console.log('error in retrieving photo affinities2!');
      return (err);
    }
  })
  .post('/:id/:category/:photoid', async (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    console.log(`Photo Impression Recieved=> UserID:${req.params.id}, Category:${req.params.category}, PhotoId:${req.params.photoid}, Affinity:${req.body.liked}`);
    const userId = req.params.id;
    const photoId = req.params.photoid;
    const { category } = req.params;
    const { liked } = req.body;
    const savedImpression = await db.userPhotoImpression({
      userId, photoId, liked, category,
    });
    // const updatePlace = await db.updatePlace({ userId, photoId });
    if (savedImpression) {
      console.log('Server has results from DB: ', savedImpression);
      // console.log('Type of results from DB: ', typeof savedImpression);
      res.status(200).send(JSON.stringify(savedImpression));
    } else {
      console.log('error in saving photo impression!');
      res.status(400).send('Photo NOT SAVED!');
    }
  });

module.exports = router;
