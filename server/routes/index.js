const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const db = require('../../database/db');

const splashImages = require('../../example_data_server/splashImages');

router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  // create new session object.
  if (req.session && req.session.key) {
    // if email key is sent redirect.
    console.log('Users SessionZZZZZ => ', req.session);
    // get user information from DB
    const user = req.session.key;
    db.checkEmail(user, (result) => {
      res.send(result);
    });
    // res.send({})
  } else {
    // else go to home page.
    console.log('key not present, index file');
    return next();
  }
});

router.get('/landing', (req, res) => {
  const initialIndex = Math.floor(Math.random() * 370);
  let imagesForSplash = new Array(30).fill('');
  imagesForSplash = imagesForSplash.map((image, i) => splashImages[initialIndex + i]);
  res.send(imagesForSplash);
});

module.exports = router;
