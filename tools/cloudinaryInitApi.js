require('dotenv').config({ path: `${__dirname}/./../.env` });

const cloudinaryKey = process.env.CLOUDINARY_KEY;
const cloudinarySecret = process.env.CLOUDINARY_SECRET;
const cloudinary = require('cloudinary');
const api = require('../example_data_server/api');
const db = require('../database/db');

const cloudinaryUpload = (image, category) => {
  const options = {
    folder: category,
    tags: category,
    api_key: cloudinaryKey,
    api_secret: cloudinarySecret,
    cloud_name: 'nextlens',
    public_id: image.id,
  };
  cloudinary.v2.uploader.upload(image.urls.regular, options, async (error, result) => {
    if (error) {
      console.log('Cloudinary Error: ', error);
    } else {
      const cloudinaryUrl = await result.secure_url;
      console.log('now its time to add to DB! ', cloudinaryUrl);
      const parameters = {
        category,
        textId: image.id,
        photographerName: image.user.name,
        profileUrl: image.user.portfolio_url,
        profileImageUrl: image.user.profile_image.medium,
        regularUrl: cloudinaryUrl,
        smallUrl: image.urls.small,
      };
      db.addPhotoToDatabaseBeta(parameters);
    }
  });
};

const uploadApiImages = (images) => {
  const promises = [];
  Object.keys(images).forEach((category) => {
    for (let i = 0; i < images[category].length; i += 1) {
    // remove page number from api key
      const categoryName = category.slice(0, category.length - 1);
      const current = images[category][i];
      promises.push(cloudinaryUpload(current, categoryName));
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

// run node cloudinaryInitApi.js to load upload api images to cloudinary and seed database tables
uploadApiImages(api);
