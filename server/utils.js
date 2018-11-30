// Load images to DB
const api = require('../example_data_server/api');
const db = require('../database/db');

const loadImagesToDb = () => {
  const promises = [];
  Object.keys(api).forEach((categories) => {
    // for each page, we will iterating the array
    api[categories].forEach((image) => {
      // we are now in each image object, 30 per page array
      const current = image;
      const unsplashId = current.id;
      const photographerName = current.user.name;
      const downloadUrl = current.links.download;
      const profileUrl = current.user.links.html;
      const profileImageUrl = current.user.profile_image.medium;
      const regularUrl = current.urls.regular;
      const smallUrl = current.urls.small;
      const thumbUrl = current.urls.thumb;
      let category = null;
      if (categories.indexOf('portrait') !== -1) {
        category = 1;
      } else if (categories.indexOf('landscape') !== -1) {
        category = 2;
      } else if (categories.indexOf('aerial') !== -1) {
        category = 3;
      } else if (categories.indexOf('street') !== -1) {
        category = 4;
      }
      const toDatabase = {
        unsplashId,
        photographerName,
        downloadUrl,
        profileUrl,
        profileImageUrl,
        regularUrl,
        smallUrl,
        thumbUrl,
        category,
      };
      console.log(`Adding ${toDatabase} to Promises Array`);
      promises.push(db.addPhotoToDatabase(toDatabase));
    });
  });
  Promise.all(promises)
    .then((something) => {
      console.log(`Finished Promise.all => ${something}`);
    })
    .catch((e) => {
      console.log(`Errors caught in Promise.all => ${e}`);
    });
};

// run node utils.js to load postgres with images from example api file
// Loads 100 images for each category (MVP 4 categories)
loadImagesToDb(api);
