const express = require('express')
const router = express.Router()
const db = require('../../database/db');

router
.get('/', (req, res) => {
    console.log(req.params);
    res.send('You have reached the users route, supply ID and authentication to continue');
})
.get('/:id', (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    res.send({'Getting data for user': req.params.id});
})
.get('/:id/likedphotos', async (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    const userId = await req.session.key || req.params.id;
    async function getUserLikedPhotos (userId) {
        const likedPhotos = await db.getUserLikes({ userId });
        if (likedPhotos === null) {
          console.log('User has no likes')
          //res.status(400).send({status: false});
        } else if (likedPhotos) {
            res.status(200).send(JSON.stringify(likedPhotos));
        } else {
            console.log('error in retrieving liked photos!');
        }
    }
    await getUserLikedPhotos(userId);
})
.get('/:id/recommendations', async (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    const userId = await req.session.key || req.params.id;
    async function getUserAffinities (userId) {
        const allPhotoAffinities = await db.getUserRecommendations({ userId });
        if (allPhotoAffinities === null) {
          console.log('User has no affinity data')
        } else if (allPhotoAffinities) {
            // Do Algorithm work for recommendations => helper function recommended!
            res.status(200).send(JSON.stringify(allPhotoAffinities));
        } else {
            console.log('error in retrieving photo affinities!');
        }
    }
    await getUserAffinities(userId);
})
.post('/:id/:photoid', (req, res) => {
    console.log('userId ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    console.log('adding something at this endpoint:', req.params.id, req.params.photoid, req.body);
    const userId = req.params.id;
    const photoId = req.params.photoid;
    const liked = req.body.liked;
    async function savePhotoImpressions (userId, photoId, liked) {
        const savedImpression = await db.userPhotoImpression({ userId, photoId, liked });
        const updatePlace = await db.updatePlace({userId, photoId});
        if (savedImpression) {
            //console.log('Server has results from DB: ', savedImpression);
            //console.log('Type of results from DB: ', typeof savedImpression);
            res.status(200).send(JSON.stringify(savedImpression));
        } else {
            console.log('error in saving photo impression!');
            res.status(400).send('Photo NOT SAVED!');
        }
    }
    savePhotoImpressions(userId, photoId, liked);
})

module.exports = router