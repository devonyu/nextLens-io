const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get random images for user to like
router.get('/random', (req, res) => {
  axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      count: 30,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

// Get curated portraits images from my collection 
router.get('/portrait', (req, res) => {
  axios.get(`https://api.unsplash.com/collections/1606374/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      per_page: 30,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

module.exports = router;
