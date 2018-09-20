// Load images to DB
const api = require('../example_data_server/api');
const db = require('../database/db')

const loadImagesToDb = (api) => {
  let promises = [];
  for (var key in api) {
    //for each page, we will iterating the array
    for (var i = 0; i < api[key].length; i++) {
      //we are now in each image object, 30 per page array
      const current = api[key][i];
      const unsplashId = current.id;
      const photographerName = current.user.name;
      const downloadUrl = current.links.download;
      const profileUrl = current.user.links.html;
      const profileImageUrl = current.user.profile_image.medium;
      const regularUrl = current.urls.regular;
      const smallUrl = current.urls.small;
      const thumbUrl = current.urls.thumb;
      let category = null;
      if (key.indexOf('portrait') !== -1) {
        category = 1;
      } else if (key.indexOf('landscape') !== -1) {
        category = 2;
      } else if (key.indexOf('aerial') !== -1) {
        category = 3;
      } else if (key.indexOf('street') !== -1) {
        category = 4;
      }
      //console.log(unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category);
      const toDatabase = { unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category };
      promises.push(db.addPhotoToDatabase(toDatabase));
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

// run node utils.js to load postgres with images from example api file
// Loads 100 images for each category (MVP 4 categories)
loadImagesToDb(api);