const dotenv = require('dotenv').config({path: '/Users/devon/projects/nextLens-io/.env'});
let cloudinaryUrl = process.env.CLOUDINARY_URL;
const api = require('../example_data_server/api');
var cloudinary = require('cloudinary');

//let test = 'https://images.unsplash.com/photo-1496284045406-d3e0b918d7ba?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=83ece52a6dab17b53a796a4692137e6e';
var cloudinary = require('cloudinary');

let cloudinaryUpload = (imageUrl, category) => {
    let options = {
        folder: category,
        tags: category
    }
    cloudinary.v2.uploader.upload(imageUrl, options, (error, result) => {
        console.log(result, error)
    });
}

const uploadApiImages = (api) => {
    let promises = [];
    for (let key in api) {
            for (let i = 0; i < api[key].length; i++) {
                //remove page number from api key
                const category = key.slice(0, key.length - 1);
                const current = api[key][i];
                const regularUrl = current.urls.regular;
                promises.push(cloudinaryUpload(regularUrl, category));
            }
    }
    Promise.all(promises)
    .then((something)=> {
        console.log('so after all the promises:', something);
    })
    .catch((e) => {
        console.log('there were errors ==>', e);
    })
}

// // run node cloudinaryLoad.js to load upload api images to cloudinary
uploadApiImages(api);