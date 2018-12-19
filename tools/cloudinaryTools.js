require('dotenv').config({ path: `${__dirname}/./../.env` });

const cloudinaryKey = process.env.CLOUDINARY_KEY;
const cloudinarySecret = process.env.CLOUDINARY_SECRET;
const cloudinary = require('cloudinary');

const cloudinaryImages = () => {
  const imageArray = [];

  cloudinary.v2.search.expression('resource_type:image').max_results(500).execute(
    (error, result) => {
      if (error) {
        console.log('err=>', error);
      } else {
        result.resources.forEach((img) => {
          imageArray.push(img.secure_url);
        });
        console.log(result.resources.length);
        console.table(imageArray);
        return imageArray;
      }
    },
  );
};

cloudinaryImages();
