const express = require('express')
const router = express.Router()
const indexRoute = require('./index.js');
const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const photosRoute = require('./photos.js');
const usersRoute = require('./users.js');
const signoutRoute = require('./signout.js');

router.use('/', indexRoute);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/users', usersRoute);
router.use('/photos', photosRoute);
router.use('/signout', signoutRoute);

router.get('/test', (req, res) => {
    console.log('testing get route at /test');
    res.status(418).send('Status 418 => Are you a teapot?');
})

module.exports = router