const express = require('express')
const router = express.Router()
const indexRoute = require('./index.js');
const signupRoute = require('./signup.js');
const loginRoute = require('./login.js');
const photosRoute = require('./photos.js');
const usersRoute = require('./users.js');
const logoutRoute = require('./logout.js');
const authentication = require('./auth.js');
const flickrRoute = require('./flickr.js');

router.use('/auth', authentication);
router.use('/', indexRoute);
router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/users', usersRoute);
router.use('/photos', photosRoute);
router.use('/logout', logoutRoute);
router.use('/flickr', flickrRoute);

module.exports = router