const express = require('express')
const router = express.Router()
const db = require('../../database/db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());

let test = {
  "firstName": "devon",
  "email": "dev@mail.com",
  "mount": 5,
  "about": "testing postman",
  "userId": 30,
  "profileimgurl": "https://randomuser.me/api/portraits/men/1.jpg"
}

router.get('/', (req, res) => {
  console.log('get route for Edit Profile working?');
  res.send({ 'get route': 'working' })
});

router.post('/:id', async (req, res) => {
  console.log('pure Test route', test);
  try {
    console.log('should work bro');
    let result = await db.updateProfile(test);
    res.status(200).send(result);
  } catch {
    console.log('error in updating from server side');
    res.status(404).send('Server Error');
  }
});

// Edit Profile Route
router.put('/:id', async (req, res) => {
  const { userId, firstName, email, mount, about, profileimgurl } = req.body;
  const toDB = { userId, firstName, email, mount, about, profileimgurl };
  console.log('Edit Profile Post route, what we got===> ', toDB);
  let result = await db.updateProfile(toDB);
  try {
    if (result && result.status) {
      console.log('Profile updated, result=> ', result);
      res.status(200).send(result);
    } else {
      console.log('Failed to update, result=> ', result);
      res.status(200).send(result);
    }
  }
  catch {
    console.log('error in updating from server side');
    res.status(200).send({ status: false });
  }
});

module.exports = router;


