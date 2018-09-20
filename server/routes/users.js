const express = require('express')
const router = express.Router()
const db = require('../../database/db');

router
.get('/', (req, res) => {
    console.log(req.params);
    res.send('You have reached the users route, supply ID and authentication to continue');
})
.get('/:id', (req, res) => {
    console.log('userId===>', req.params.id);
    console.log('authenticated?===>', req.params.authenticated === true);
    res.send({'Getting data for user': req.params.id});
})
.get('/:id/likedphotos', (req, res) => {
    console.log('userId===>', req.session.key);
    console.log('authenticated? ===>', req.session.auth=== true);
    const userId = req.session.key;
    async function getUserLikedPhotos (userid) {
        const likedPhotos = await db.getUserLikes({ userId });
        if (likedPhotos === null) {
          //res.status(400).send({status: false});
          console.log('User has no likes')
        } else if (likedPhotos) {
            console.log('Server has: ', likedPhotos);
            console.log(typeof likedPhotos);
            res.status(200).send(JSON.stringify(likedPhotos));
        } else {
            console.log('error in retrieving liked photos!');
        }
    }
    getUserLikedPhotos(userId);
})
.post('/:id/:photoid', (req, res) => {
    // will add photoid and userid to likes table with boolean, test in postman
    console.log('adding something at this endpoint:', req.params.id, req.params.photoid, req.body);
    const userId = req.params.id;
    const photoId = req.params.photoid;
    const liked = req.body.liked;
    async function savePhotoImpressions (userId, photoId, liked) {
        const savedImpression = await db.userPhotoImpression({ userId, photoId, liked });
        if (savedImpression) {
            console.log('Server has results from DB: ', savedImpression);
            console.log('Type of results from DB: ', typeof savedImpression);
            res.status(200).send(JSON.stringify(savedImpression));
        } else {
            console.log('error in saving photo impression!');
            res.status(400).send('Photo NOT SAVED!');
        }
    }
    savePhotoImpressions(userId, photoId, liked);
})

module.exports = router