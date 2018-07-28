const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('../database/db');
const bcrypt = require('bcrypt');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.load();
app.use(bodyParser.json());
app.use(morgan('dev'));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('/test', (req, res) => {
  res.send('{"message":"testing the /test endpoint"}');
});

// Get random images for user to like
app.get('/pics', (req, res) => {
  axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      count: 30,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

// Get curated portraits images from my collection 
app.get('/portrait', (req, res) => {
  axios.get(`https://api.unsplash.com/collections/1606374/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      per_page: 30,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

// Gets images related to lenses and related queries
app.get('/landing', (req, res) => {
  const keywords = ['abstract', 'action', 'aerial', 'animals', 'architecture', 'art', 'awesome', 'beautiful', 'black and white', 'camera', 'canyon', 'city', 'cityscape', 'color', 'composite', 'computer', 'documentary', 'face', 'family', 'fashion', 'food', 'future', 'gear', 'glass', 'holiday', 'interior', 'landscape', 'lens', 'macro', 'man', 'minimalism', 'model', 'nature', 'neon', 'pattern', 'photography', 'portrait', 'pose', 'reflection', 'rooftop', 'shadow', 'skyline', 'smile', 'space', 'street', 'style', 'taking photo', 'technology', 'texture', 'travel', 'urban', 'wallpaper', 'waterfall', 'wedding', 'woman'];
  const randomQuery = keywords[Math.floor(Math.random() * keywords.length)];
  axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      query: randomQuery,
      per_page: 30,
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});

// Signup Route
app.post('/signup', (req, res) => {
  const { firstName, email, password, mount, about } = req.body;
  const toClient = { firstName, email, password, mount, about };
  console.log('Sign up router HIT, what we got===> ', toClient);
  
  async function checkSignUp (userInformation) {
    const userExists = await db.checkEmail(toClient.email);
    if (userExists !== undefined) {
      res.send({status: false});
    } else if (userExists === undefined) {
      const passwordHash = await bcrypt.hash(toClient.password, 10);
      toClient.password = passwordHash;
      const signingUp = await db.signUp(toClient);
      if (signingUp.status !== true) {
        res.send({status: 'error'});
      } else if (signingUp.status === true) {
        res.send({status: true});
      }
    }
  }
  checkSignUp(toClient);
});

// Login route
app.post('/login', (request, response) => {
  const loginInput = request.body;
  async function checkCredentials (credentials) {
    const user = await db.checkEmail(credentials.email, (res) => {
      return res.rows[0];
    });
    if (user === undefined) {
      response.send({status: false});
    }
    const match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
      console.log('CORRECT PASSWORD')
      delete user.password;
      response.send(user);
    } else {
      console.log('WRONG PASSWORD')
      response.send({status: false});
    }
  }
  checkCredentials(loginInput);
});

app.post('/logout', (req, res) => {
  console.log('logging user');
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// Which port is the NodeJS server listening on
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
