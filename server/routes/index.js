const express = require('express')
const router = express.Router()
const axios = require('axios');
const db = require('../../database/db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/', function(req, res, next){
  // create new session object.
  if(req.session && req.session.key) {
  // if email key is sent redirect.
    console.log('Users SessionZZZZZ => ', req.session)
    // get user information from DB
    let user = req.session.key;
    db.checkEmail(user, (result)=> {
      res.send(result)
    });
    //res.send({})
  } else {
  // else go to home page.
    console.log('key not present, index file');
    return next();
  }
});

router.get('/landing', (req, res) => {
  const keywords = ['abstract', 'action', 'aerial', 'animals', 'architecture', 'art', 'awesome', 'beautiful', 'black and white', 'camera', 'canyon', 'city', 'cityscape', 'color', 'composite', 'computer', 'documentary', 'face', 'family', 'fashion', 'food', 'future', 'gear', 'glass', 'holiday', 'interior', 'landscape', 'lens', 'macro', 'man', 'minimalism', 'model', 'nature', 'neon', 'pattern', 'photography', 'portrait', 'pose', 'reflection', 'rooftop', 'shadow', 'skyline', 'smile', 'space', 'street', 'style', 'taking photo', 'technology', 'texture', 'travel', 'urban', 'wallpaper', 'waterfall', 'wedding', 'woman'];
  const randomQuery = keywords[Math.floor(Math.random() * keywords.length)];
  axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      query: randomQuery,
      per_page: 10,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

module.exports = router;


