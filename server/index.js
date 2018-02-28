const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Client } = require('pg');
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
  res.send('{"message":"testing the /test endpoint"}')
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const toClient = { username, password };
  // sends username and password to database to store
  // const connectionString = process.env.DATABASE_URL
  res.send(toClient);
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

app.get('/db', (request, response) => {
  let result;
  // Change env variable to TEST_DATABASE to test locally
  // or to DATABASE_URL for deployed postgres server on Heroku
  const connectionString = process.env.DATABASE_URL;
  const client = new Client({ connectionString });
  client.connect();
  client.query('SELECT * from information', (err, res) => {
    result = res.rows;
    client.end();
    console.log(result);
    response.send(JSON.stringify(result));
  });
});


// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

