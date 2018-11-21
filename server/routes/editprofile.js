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
    res.send({'get route': 'working'})
});

router.post('/:id', async (req, res) => {
    console.log('pure Test route', test);
    try {
    console.log('should work bro');
    let result = await db.updateProfile(test);
    res.status(200).send(result);
    }
    catch {
      console.log('error in updating from server side');
    }
  });

// Edit Profile Route
router.put('/:id', async (req, res) => {
  const { userId, firstName, email, mount, about, profileimgurl } = req.body;
  const toDB = { userId, firstName, email, mount, about, profileimgurl };
  console.log('Edit Profile Post route, what we got===> ', toDB);
  try {
    let result = await db.updateProfile(toDB);
    if (result.status) {
        res.status(200).send(result);
    } else {
        console.log('Failed to update');
        res.status(200).send(result);
    }
  }
  catch {
    console.log('error in updating from server side');
    res.status(200).send(result);
  }
});

module.exports = router;


