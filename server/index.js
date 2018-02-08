const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  console.log('/api hit!')
  res.send('{"message":"Welcome to NextLens.io \n You are connected via Node.JS"}');
});


app.get('/test', function (req, res) {
  console.log('test hit');
  res.send('{"message":"testing the /test endpoint"}')
});

app.get('/signup', function (req, res) {
  res.send('{"message":"signup endpoint hit!"}')
});

//Get random images for user to like
app.get('/pics', (req, res) => {
  console.log('30 Random Incoming pictures from Unsplash');
  axios.get('https://api.unsplash.com/photos/random/?client_id=6ebc0ce91af88792678fc2e0df9905da0e7f9ec1f9ad61fadb827a86a28268c6', {
    params: {
      count: 30
    }
  })
  .then(result => {
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
