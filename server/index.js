const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  console.log('/api hit!')
  res.send('{"message":"Welcome to NextLens.io You are connected via Node.JS"}');
});


app.get('/test', function (req, res) {
  console.log('req: ', req.body)
  console.log('test')
  res.send('{"message":"testing the /test endpoint"}')

});



// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
