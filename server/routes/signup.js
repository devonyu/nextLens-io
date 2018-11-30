const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../../database/db');

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {
  console.log('get route working?');
  res.send({ 'get route': 'working' });
});

// Signup Route
router.post('/', (req, res) => {
  const {
    firstName, email, password, mount, about, profileimgurl,
  } = req.body;
  const toClient = {
    firstName, email, password, mount, about, profileimgurl,
  };
  console.log('Sign up router HIT, what we got===> ', toClient);
  async function checkSignUp(userInformation) {
    const userExists = await db.checkEmail(userInformation.email);
    console.log('userExists server: ', userExists);
    if (userExists !== undefined) {
      res.status(200).send({ status: false });
    } else if (userExists === undefined) {
      console.log('user doesnt exist');
      const passwordHash = await bcrypt.hash(toClient.password, 10);
      toClient.password = passwordHash;
      const signingUp = await db.signUp(toClient);
      if (signingUp.status !== true) {
        res.status(400).send({ status: 'error' });
      } else if (signingUp.status === true) {
        res.status(200).send({ status: true });
      }
    }
  }
  checkSignUp(toClient);
});

module.exports = router;
