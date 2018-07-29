const express = require('express');
const router = express.Router();
const axios = require('axios');
//import { getRandomPictures, getPortraitPictures } from '../helpers';

// Get random images for user to like
router.get('/random', (req, res) => {
  axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      count: 30,
    },
  })
  .then((result) => {
      res.status(200).send(result.data);
  })
  .catch((err) => {
      console.log('error in axios=> ', err);
      res.status(418).send(err);
  })
});

// Get curated portraits images from my collection 
router.get('/portrait', (req, res) => {
  axios.get(`https://api.unsplash.com/collections/1606374/?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      count: 30,
    },
  })
  .then((result) => {
      res.status(200).send(result.data);
  })
  .catch((err) => {
      console.log('error in axios=> ', err);
      res.status(418).send(err);
  })
});

module.exports = router;
