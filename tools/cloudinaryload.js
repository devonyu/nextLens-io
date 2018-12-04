const dotenv = require('dotenv').config({ path: '/Users/devon/projects/nextLens-io/.env' });

const cloudinaryUrl = process.env.CLOUDINARY_URL;

// let test = 'https://images.unsplash.com/photo-1496284045406-d3e0b918d7ba?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjE5NjU3fQ&s=83ece52a6dab17b53a796a4692137e6e';
const cloudinary = require('cloudinary');
const api = require('../example_data_server/api');

const cloudinaryUpload = (imageUrl, category) => {
  const options = {
    folder: category,
    tags: category,
  };
  cloudinary.v2.uploader.upload(imageUrl, options, (error, result) => {
    console.log(result, error);
  });
};

const uploadApiImages = () => {
  const promises = [];
  Object.keys(api).forEach((category) => {
    for (let i = 0; i < api[category].length; i += 1) {
      // remove page number from api key
      const categoryName = category.slice(0, category.length - 1);
      const current = api[category][i];
      const regularUrl = current.urls.regular;
      promises.push(cloudinaryUpload(regularUrl, categoryName));
    }
  });

  Promise.all(promises)
    .then((something) => {
      console.log('so after all the promises:', something);
    })
    .catch((e) => {
      console.log('there were errors ==>', e);
    });
};

// // run node cloudinaryLoad.js to load upload api images to cloudinary
uploadApiImages(api);
