const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../database/db');
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4')
const dotenv = require('dotenv');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const redis = require('redis');
dotenv.load();
const client = redis.createClient(process.env.REDIS_URL);
const RedisStore = require('connect-redis')(session);
const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
//app.use(cors);
app.use(cookieParser());

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

client.on('connect', function() {
  console.log('redis connected');
});

app.use(session({
  //store: new RedisStore({host: 'localhost', port: 6379, client: client, ttl: 60}),
  store: new RedisStore({client: client, ttl: 60000}),
  id: uuidv4,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}));

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
