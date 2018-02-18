const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.load();
app.use(bodyParser.json())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  console.log('/api hit!');
  res.send('{"message":"Welcome to NextLens.io You are connected via Node.JS"}');
});

app.get('/test', function (req, res) {
  console.log('test hit');
  res.send('{"message":"testing the /test endpoint"}')
});

app.post('/signup', function (req, res) {
  let {username, password} = req.body;
  console.log(`Signup data submitted: username: ${username} password: ${password}`);
  let toClient = {
    username: username, 
    password: password
  };
  console.log(process.env.UNSPLASH_URL);
  //sends username and password to database to store
  //const connectionString = process.env.DATABASE_URL
  res.send(toClient);
});

//Get random images for user to like
app.get('/pics', (req, res) => {
  console.log('30 Random Incoming pictures from Unsplash');
  axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`, {
    params: {
      count: 30
    }
  })
  .then(result => {
    res.send(result.data);
  })
})

app.get('/landing', (req, res) => {
  console.log('Splash page request');
  axios.get(`https://api.unsplash.com/collections/1351856/photos/?client_id=${process.env.UNSPLASH_URL}`)
  .then(result => {
    console.log('pictures incoming from a photos collection on Unsplash')
    res.send(result.data);
  })
})


// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
