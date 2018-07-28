const express = require('express')
const router = express.Router()
const db = require('../../database/db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const bcrypt = require('bcrypt');
const axios = require('axios');

router.get('/', (req, res) => {
    console.log('get route working?');
    res.send({'get route': 'working'})
});

// Signup Route
router.post('/', (req, res) => {
  const { firstName, email, password, mount, about, profileimgurl } = req.body;
  const toClient = { firstName, email, password, mount, about, profileimgurl };
  console.log('Sign up router HIT, what we got===> ', toClient);
  async function checkSignUp (userInformation) {
    const userExists = await db.checkEmail(toClient.email);
    if (userExists !== undefined) {
      res.status(400).send({status: false});
    } else if (userExists === undefined) {
      const passwordHash = await bcrypt.hash(toClient.password, 10);
      toClient.password = passwordHash;
      const signingUp = await db.signUp(toClient);
      if (signingUp.status !== true) {
        res.status(400).send({status: 'error'});
      } else if (signingUp.status === true) {
        res.status(200).send({status: true});
      }
    }
  }
  checkSignUp(toClient);
});

module.exports = router;


