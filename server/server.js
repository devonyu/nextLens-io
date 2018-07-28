const express = require('express');
const path = require('path');
const db = require('../database/db');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();

const PORT = process.env.PORT || 5000;

dotenv.load();
app.use(morgan('dev'));

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

var router = require('./routes/router')
app.use('/', router);

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  console.log('catch all with *')
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// Which port is the NodeJS server listening on
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
