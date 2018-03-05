const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');

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
  // Check database for email address
  const checkSignUp = async () => {
    try {
      await db.checkEmail(toClient.email, (response) => {
        console.log('result of checkEmail: ', response.rows[0]);
        if (response.rows[0]) {
          console.log('user EXISTS ALREADY! ABORT');
          res.send({ status: false });
        } else if (response.rows[0] === undefined) {
          db.signUp(toClient, () => {
            console.log('signing up user: ', toClient.email);
          });
          res.send('signed UP!');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  checkSignUp();
});

// Login route
app.post('/login', (request, response) => {
  const input = request.body;
  db.checkLogin(input, (res) => {
    response.send(res);
  });
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
