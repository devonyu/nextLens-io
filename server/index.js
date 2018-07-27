const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.load();
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Welcome to NextLens.io You are connected via Node.JS"}');
});

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

// Gets collection of images from first photo lens collection - soon to be a larger search query
app.get('/landing', (req, res) => {
  axios.get(`https://api.unsplash.com/collections/1351856/photos/?client_id=${process.env.UNSPLASH_URL}`)
    .then((result) => {
      res.send(result.data);
    });
});

// Gets 100 images related to lenses and related queries
app.get('/newlanding', (req, res) => {
  const keywords = ['camera lens', 'dslr', 'camera', 'lens', 'drone', 'portrait', 'wide'];
  const randomQuery = keywords[Math.floor(Math.random() * keywords.length)];
  axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      query: randomQuery,
      per_page: '100',
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
    //check if email exist first?
    const userExists = await db.checkEmail(toClient.email);
    //if exist, exit out now.
    if (userExists !== undefined) {
      res.send({status: false});
    } else if (userExists === undefined) {
    //if not exist, sign user up
      const passwordHash = await bcrypt.hash(toClient.password, 10);
      toClient.password = passwordHash;
    //signing user up with new hashed password
      const signingUp = await db.signUp(toClient);
    //if error occured, let them know
      if (signingUp.status !== true) {
        res.send({status: 'error'});
      } else if (signingUp.status === true) {
            //if signed up sucsessfully, let them know
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
    // If email not found, show error
    if (user === undefined) {
      response.send({status: false});
    }
    // If email found, compare salted password with bcrypt
    const match = await bcrypt.compare(credentials.password, user.password);
    if (match) {
      console.log('passwords MATCH')
      response.send(user);
    } else {
      console.log('WRONG PASSWORD. ')
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
