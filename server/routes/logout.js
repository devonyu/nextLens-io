const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/', (req, res) => {
  console.log('qqqqq?', req.body)
  let fad = req.session.key;
  console.log('this is session? ==>', req.session);
  console.log('from redis ====> ', fad);
  req.session.destroy((err)=> {
    if (err) {
      console.log(err);
      console.log('ISSUE IN SERVER LOG OUT SESSION!');
      res.status(400).send('may day!')
    } else {
      console.log('session destroyed!')
      res.status(200).send('hey signed out and sessions destroyed');
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