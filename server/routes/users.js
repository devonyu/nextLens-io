const express = require('express')
const router = express.Router()
const db = require('../../database/db');

router
.get('/', (req, res) => {
    console.log(req.params);
    res.send({'HELLO': 'USER HERE'});
})
.get('/:id', (req, res) => {
    console.log('userId===>', req.params.id);
    console.log('authenticated? ===>', req.params.authenticated === true);
    res.send({'Getting data for user': req.params.id});
})

module.exports = router