const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.load();
app.use(bodyParser.json());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', (req, res) => {
  res.set('Content-Type', 'application/json');
  console.log('/api hit!');
  res.send('{"message":"Welcome to NextLens.io You are connected via Node.JS"}');
});

app.get('/test', (req, res) => {
  console.log('test hit');
  res.send('{"message":"testing the /test endpoint"}')
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  console.log(`Signup data submitted: username: ${username} password: ${password}`);
  const toClient = { username, password };
  console.log(process.env.UNSPLASH_URL);
  // sends username and password to database to store
  // const connectionString = process.env.DATABASE_URL
  res.send(toClient);
});

// Get random images for user to like
app.get('/pics', (req, res) => {
  console.log('30 Random Incoming pictures from Unsplash');
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
  console.log('Splash page request');
  axios.get(`https://api.unsplash.com/collections/1351856/photos/?client_id=${process.env.UNSPLASH_URL}`)
    .then((result) => {
      console.log('pictures incoming from a photos collection on Unsplash');
      res.send(result.data);
    });
});

// Gets 100 images related to lenses
app.get('/newlanding', (req, res) => {
  axios.get(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      query: 'camera lens',
      per_page: '100',
    },
  })
    .then((result) => {
      res.send(result.data);
    });
});


// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

