const express = require('express')
const router = express.Router()
const Flickr = require('flickrapi');
const FlickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_SECRET
};

// Options for Flick API
//description, license, date_upload, date_taken, owner_name, icon_server, original_format, last_update, geo, tags,
//machine_tags, o_dims, views, media, path_alias, url_sq, url_t, url_s, url_q, url_m, url_n, url_z, url_c, url_l, url_o

router
.get('/', (req, res) => {
    console.log(req.params);
    res.send('You have reached the flickr Route!');
})
.get('/:id', (req, res) => {
    console.log('UserID ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    Flickr.tokenOnly(FlickrOptions, function(error, flickr) {
        let options = {
            api_key: process.env.FLICKR_API_KEY,
            group_id: req.params.id,
            page: 1,
            per_page: 50,
            extras: 'url_c'
        }
        try {
            flickr.groups.pools.getPhotos(options, function(err, result) {
                res.status(200).send(JSON.stringify(result));
            });
        }
        catch (err) {
            console.log('Error in getting photos => ', err)
            res.status(200).send('Error!');
        }
    });
})
.get('/search/:query', (req, res) => {
    console.log('UserID ===>', req.session.key, ' Authenticated? ===>', req.session.auth === true);
    console.log('search query=> ', req.params.query);
    Flickr.tokenOnly(FlickrOptions, function(error, flickr) {
        let options = {
            api_key: process.env.FLICKR_API_KEY,
            tags: req.params.query,
            content_type: 1,
            page: 1,
            per_page: 50,
            format: 'json',
            extras: 'url_c'
        }
        try {
            flickr.photos.search(options, function(err, result) {
                res.status(200).send(JSON.stringify(result));
            });
        }
        catch (err) {
            console.log('Error in getting photos => ', err)
            res.status(200).send('Error!');
        }
    });
})

module.exports = router