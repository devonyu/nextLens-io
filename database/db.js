const { Client } = require('pg');
const { parseStringSQL } = require('../helpers/parseStringSQL');
// Use TEST_DATABASE for local development DB || DATABASE_URL for heroku DB
let connectionString;
if (process.env.ENVIROMENT === 'development') {
  connectionString = process.env.TEST_DATABASE;
} else if (process.env.ENVIROMENT === 'production') {
  connectionString = process.env.DATABASE_URL;
}
const client = new Client({
  connectionString,
});
client.connect();

const signUp = async (params) => {
  const {
    firstName, email, password, mount, profileimgurl,
  } = params;
  const about = parseStringSQL(params.about);
  const query = `INSERT into users (email, firstName, password, mount, about, profileimgurl) VALUES ('${email}', '${firstName}', '${password}', ${mount}, '${about}', '${profileimgurl}');`;
  try {
    const insertUser = await client.query(query);
    console.log('RESULT OF SIGNING UP USER=> ,', insertUser);
    return { status: true };
  } catch (err) {
    console.log('DB Error: Signup failed: ', err);
    return {
      status: false,
      error: err,
    };
  }
};

const checkEmail = async (email) => {
  const query = `Select * from users where email = '${email}'`;
  try {
    const userInformation = await client.query(query);
    console.log('checking email in DB:', email);
    return userInformation.rows[0];
  } catch (err) {
    console.log('Error in checking email');
    return {
      status: false,
      error: err,
    };
  }
};

const checkUserId = async (id) => {
  const query = `Select * from users where id = '${id}'`;
  try {
    const userInformation = await client.query(query);
    console.log('checking id in DB:', id);
    return userInformation.rows[0];
  } catch (err) {
    console.log('Error in checking UserId');
    return {
      status: false,
      error: err,
    };
  }
};

const checkLogin = async (params) => {
  const { email, password } = params;
  const query = `Select * from users where email = '${email}' and password = '${password}';`;
  const loginResult = await client.query(query);
  if (!loginResult.rows[0]) {
    return ({ status: false });
  }
  return loginResult.rows[0];
};

const userPhotoImpression = async (params) => {
  // add current photoID with userID to the userLikes table with the impression of true or false
  const { userId, photoId, liked } = params;
  const query = `INSERT into user_likes (userId, photoId, liked) Values (${userId}, ${photoId}, ${liked});`;
  const impressionResult = await client.query(query);
  try {
    if (!impressionResult.rowCount) {
      return ({ status: false });
    }
    return ({ status: true });
  } catch (err) {
    console.log('Error in adding photo impression');
    return {
      status: false,
      error: err,
    };
  }
};

const getUserLikes = async (params) => {
  // Function will do a query on all photos liked by user in userLikes table
  const { userId } = params;
  // const query = `SELECT * FROM user_likes WHERE userid = ${userId} and liked = true;`;
  // console.log(`getting user likes in DB for ${userId}`);
  const query = `SELECT * FROM user_likes INNER JOIN photos ON user_likes.userid = ${userId} and user_likes.liked = true and user_likes.photoid = photos.id;`;
  // We want to return the images themselves from the photos table (update query)
  const likedPhotos = await client.query(query);
  if (!likedPhotos.rows) {
    return (null);
  }
  // console.log('DB Found and sending to server==> ', likedPhotos.rows)
  return likedPhotos.rows;
};

const getUserRecommendations = async (params) => {
  // Function will sort top liked categories and return lens recommendations based on query
  // Find top 3 categories for user.
  console.log(`Getting User Affinities for ${params}`);
  const { userId } = params;
  // const query = `SELECT * FROM user_likes WHERE userid = ${userId} and liked = true;`;
  const query = `SELECT category, liked FROM user_likes INNER JOIN photos ON user_likes.userid = ${userId} and user_likes.photoid = photos.id;`;
  // We want to return the images themselves from the photos table (update query)
  try {
    const photoAffinities = await client.query(query);
    if (!photoAffinities.rows) {
      console.log(`No Affinities Found for userId: ${userId}`);
      return null;
    }
    console.log('DB Photo Affinities Success ', photoAffinities.rows);
    return photoAffinities.rows;
  } catch (error) {
    console.log('DB Error: Could not get photo Affinities');
    return error;
  }
};

const addPhotoToDatabase = async (params) => {
  // Function will load images to database from json api
  const {
    unsplashId, photographerName, downloadUrl, profileUrl,
    profileImageUrl, regularUrl, smallUrl, thumbUrl, category,
  } = params;
  const query = `INSERT into photos (unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category)
  Values ('${unsplashId}', '${photographerName}', '${downloadUrl}', '${profileUrl}', '${profileImageUrl}', '${regularUrl}', '${smallUrl}', '${thumbUrl}', '${category}');`;
  try {
    const savePhoto = await client.query(query);
    // console.log('Added Photo Id:', unsplashId, ' to Postgres!');
    if (!savePhoto) {
      console.log('Error in adding photo to DB');
      return { status: false };
    }
    return { status: true };
  } catch (err) {
    console.log('Error in adding photo to DB');
    return {
      status: false,
      error: err,
    };
  }
};

const updatePlace = async (params) => {
  // Updates users place to persist next images to show
  const { userId, photoId } = params;
  const query = `UPDATE users SET place = ${photoId} WHERE id = ${userId};`;
  const updatePlaceQuery = await client.query(query);
  try {
    if (!updatePlaceQuery.rowCount) {
      return ({ status: false });
    }
    return ({ status: true });
  } catch (err) {
    console.log('Error in updating place');
    return {
      status: false,
      error: err,
    };
  }
};

const updateProfile = async (params) => {
  console.log('DB hit!, params=> ', params);
  const {
    userId, firstName, email, mount, profileimgurl,
  } = params;
  const about = parseStringSQL(params.about);
  const query = `UPDATE users SET firstName = '${firstName}', email = '${email}', mount = ${mount}, profileimgurl = '${profileimgurl}', about = '${about}' WHERE id = ${userId};`;
  console.log('Query formated! ==> ', query);
  const updateProfileQuery = await client.query(query);
  try {
    if (!updateProfileQuery.rowCount) {
      console.log('DB Failed update profile');
      return ({ status: false });
    }
    console.log('DB Sucsess update profile');
    return ({ status: true });
  } catch (err) {
    console.log(`Error in updating profile for userId:${userId}`);
    return {
      status: false,
      error: err,
    };
  }
};

const addPhotoToDatabaseBeta = async (params) => {
  // Function will load images to database from json api
  const {
    textId, photographerName, profileUrl,
    profileImageUrl, regularUrl, smallUrl, category,
  } = params;
  const query = `INSERT into ${category} (textId, photographerName, profileUrl, profileImageUrl, regularUrl, smallUrl)
  Values ('${textId}', '${photographerName}', '${profileUrl}', '${profileImageUrl}', '${regularUrl}', '${smallUrl}');`;
  try {
    const savePhoto = await client.query(query);
    // console.log('Added Photo Id:', unsplashId, ' to Postgres!');
    if (!savePhoto) {
      console.log('Error in adding photo to DB : ', params);
      return { status: false };
    }
    return { status: true };
  } catch (err) {
    console.log('Error in adding photo to DB', params);
    console.log('Error => ', err);
    return {
      status: false,
      error: err,
    };
  }
};

const getPhotosFromIndex = async (params) => {
  const {
    category, amount, index,
  } = params;
  const query = `SELECT * FROM ${category} WHERE id > ${index} LIMIT ${amount};`;
  const getPhotosQuery = await client.query(query);
  try {
    if (!getPhotosQuery) {
      console.log('Error in getting photos from DB : ', params);
      return { status: false };
    }
    // console.log('Success in querying photos for Photoswiper in DB: ', getPhotosQuery.rows);
    return getPhotosQuery.rows;
  } catch (err) {
    console.log('Error in getting photo to DB', params);
    console.log('Error => ', err);
    return {
      status: false,
      error: err,
    };
  }
};

const getLastSeenImages = async (params) => {
  //console.log(`Getting Last Seen Images for ${params}`);
  const { userId } = params;
  const query = `SELECT category, MAX(photoid) AS IndexLastSeen
  FROM user_likes
  WHERE user_likes.userid = ${userId}
  GROUP BY category;`;
  try {
    const lastSeenImages = await client.query(query);
    if (!lastSeenImages.rows) {
      console.log(`No Images Found for userId: ${userId}`);
      return null;
    }
    // console.log('DB Last Seen Images Success ', lastSeenImages.rows);
    return lastSeenImages.rows;
  } catch (error) {
    console.log('DB Error: Could not get Last Seen Images');
    return error;
  }
};

module.exports = {
  checkLogin,
  checkEmail,
  checkUserId,
  signUp,
  userPhotoImpression,
  getUserLikes,
  getUserRecommendations,
  getLastSeenImages,
  addPhotoToDatabase,
  addPhotoToDatabaseBeta,
  getPhotosFromIndex,
  updatePlace,
  updateProfile,
};
