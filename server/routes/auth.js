const express = require('express')
const router = express.Router()
const db = require('../../database/db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use('/',  async (req, res, next) => {
    // create new session object.
    if(req.session && req.session.key) {
    // if email key is sent redirect.
      console.log('Users Session within Server=> ', req.session)
      // get user information from DB
      let user = req.session.key;
      console.log('user found: ', user);
      let results = await db.checkEmail(user);
      delete results.password;
      console.log('results of auth: ', results);
      res.send(results);
    } else {
    // else go to home page.
      console.log('key not present, No user session located');
      //return next();
    }
  });

  module.exports = router;