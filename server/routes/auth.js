const express = require('express');
const bodyParser = require('body-parser');
const db = require('../../database/db');

const router = express.Router();
router.use(bodyParser.json());

router.use('/', async (req, res) => {
  // create new session object.
  if (req.session && req.session.key) {
    // if email key is sent redirect.
    console.log('Users Session within Server=> ', req.session);
    // get user information from DB
    const user = req.session.key;
    console.log('user found: ', user);
    const results = await db.checkUserId(user);
    delete results.password;
    console.log('results of auth: ', results);
    res.send(results);
  } else {
    // else go to home page.
    console.log('key not present, No user session located');
    res.send({ error: 'NOT AUTHENTICATED' });
  }
});

module.exports = router;
