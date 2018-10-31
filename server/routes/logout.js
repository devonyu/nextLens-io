const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', (req, res) => {
  let fad = req.session.key;
  console.log('Session should be here => ', req.session);
  console.log('Redis ID => ', fad);
  req.session.destroy((err)=> {
    if (err) {
      console.log(err);
      console.log('ISSUE IN SERVER LOG OUT SESSION!');
      res.status(400).send('may day!')
    } else {
      console.log('Signed out and sessions destroyed in Backend');
      console.log('session should not be here => ', req.session);
      res.status(200).send('Signed out and sessions destroyed in Backend');
    }
  });
});

router.get('/test', (req, res) => {
  console.log(req.body)
  let test = req.body;
  req.session.destroy((err)=> {
    if (err) {
      console.log(err);
      console.log('nope')
    } else {
      console.log('session destroyed')
      res.status(201).send('test route');
    }
  });
});

module.exports = router;