const express = require('express')
const router = express.Router()
const db = require('../../database/db');
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const bcrypt = require('bcrypt');
// Login route

router
.post('/', (request, response) => {
  const loginInput = request.body || request.query;
  async function checkCredentials (credentials) {
    const user = await db.checkEmail(credentials.email, (res) => {
      return res.rows[0];
    });
    if (user === undefined) {
      response.status(400).send({error: 'Email does not exist'});
    }
    const match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
      // console.log('CORRECT PASSWORD')
      // console.log(request.session)
      delete user.password;
      // Create session
      // Redis must be connected are else this wont work
      request.session.key = user.id;
      //set cookie on browser
      user.cookie = request.session.id;
      request.session.auth = true;
      //console.log('created session: ', request.session);
      response.status(200).send(user);
    } else {
      console.log('WRONG PASSWORD')
      response.status(403).send({status: false});
    }
  }
  checkCredentials(loginInput);
})
.get('/', (req, res) => {
    //console.log('GET from Login, nothing here');
    res.send('GET outta HERE');
})
.get('/test', (req, res) => {
    //console.log('test logging in @ /login/test, return yeezy string');
    res.status(200).send('yeezy');
})

module.exports = router;