const { Client } = require('pg');
// Use TEST_DATABASE for local development DB || DATABASE_URL for heroku DB
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/nextlens';
const client = new Client({
  connectionString,
});
client.connect();

const signUp = async (params) => {
  const { firstName, email, password, mount, about, profileimgurl } = params;
  const query = `INSERT into users (email, firstName, password, mount, about, profileimgurl) VALUES ('${email}', '${firstName}', '${password}', ${mount}, '${about}', '${profileimgurl}');`;
  try {
    const insertUser = await client.query(query);
    console.log('RESULT OF SIGNING UP USER=> ,', insertUser);
    return {status: true};
  } catch(err) {
    console.log('Error in signing up');
    return {
      status: false,
      error: err
    };
  }
};

const checkEmail = async (email) => {
  const query = `Select * from users where email = '${email}'`;
  try {
    const userInformation = await client.query(query);
    console.log('checking email in DB:', email)
    return userInformation.rows[0];
  } catch(err) {
    console.log('Error in checking email');
    return {
      status: false,
      error: err
    };
  }
};

const checkUserId = async (id) => {
  const query = `Select * from users where id = '${id}'`;
  try {
    const userInformation = await client.query(query);
    console.log('checking id in DB:', id)
    return userInformation.rows[0];
  } catch(err) {
    console.log('Error in checking UserId');
    return {
      status: false,
      error: err
    };
  }
};

const checkLogin = async (params) => {
  const { email, password } = params;
  const query = `Select * from users where email = '${email}' and password = '${password}';`;
  const loginResult = await client.query(query);
  if (!loginResult.rows[0]) {
    return ({status: false});
  } else {
    return loginResult.rows[0];
  }
};

const userPhotoImpression = async (params) => {
  //Function will add current photoID with userID to the userLikes table with the impression of true or false
  const { userId, photoId, liked} = params;
  const query = `INSERT into user_likes (userId, photoId, liked) Values (${userId}, ${photoId}, ${liked});`;
  const impressionResult = await client.query(query);
  try {
    if (!impressionResult.rowCount) {
      return ({status: false});
    } else if (impressionResult.rowCount){
      return ({status: true});
    }
  } catch (err) {
    console.log('Error in adding photo impression');
    return {
      status: false,
      error: err
    };
  }
}

const getUserLikes = async (params) => {
  //Function will do a query on all photos liked by user in userLikes table
  const { userId } = params;
  //const query = `SELECT * FROM user_likes WHERE userid = ${userId} and liked = true;`;
  //console.log(`getting user likes in DB for ${userId}`);
  const query = `SELECT * FROM user_likes INNER JOIN photos ON user_likes.userid = ${userId} and user_likes.liked = true and user_likes.photoid = photos.id;`;
  // We want to return the images themselves from the photos table (update query)
  const likedPhotos = await client.query(query);
  if (!likedPhotos.rows) {
    return (null);
  } else {
    //console.log('DB Found and sending to server==> ', likedPhotos.rows)
    return likedPhotos.rows;
  }
}

const getUserRecommendations = async (params) => {
  // Function will sort top liked categories and return lens recommendations based on query
  // Find top 3 categories for user.  Show them the lenses that are associated with their mount and categories
  console.log(`Getting User Affinities for ${params}`);
  const { userId } = params;
  //const query = `SELECT * FROM user_likes WHERE userid = ${userId} and liked = true;`;
  const query = `SELECT category, liked FROM user_likes INNER JOIN photos ON user_likes.userid = ${userId} and user_likes.photoid = photos.id;`;
  // We want to return the images themselves from the photos table (update query)
  const photoAffinities = await client.query(query);
  if (!photoAffinities.rows) {
    return (null);
  } else {
    //console.log('DB Found and sending to server==> ', photoAffinities.rows)
    return photoAffinities.rows;
  }
}

const addPhotoToDatabase = async (params) => {
  // Function will load images to database from json api
  const { unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category } = params;
  const query = `INSERT into photos (unsplashId, photographerName, downloadUrl, profileUrl, profileImageUrl, regularUrl, smallUrl, thumbUrl, category)
  Values ('${unsplashId}', '${photographerName}', '${downloadUrl}', '${profileUrl}', '${profileImageUrl}', '${regularUrl}', '${smallUrl}', '${thumbUrl}', '${category}');`;
  try {
    const savePhoto = await client.query(query);
    //console.log('Added Photo Id:', unsplashId, ' to Postgres!');
    return {status: true}; 
  } catch(err) {
    console.log('Error in adding photo to DB');
    return {
      status: false,
      error: err
    };
  }
}

const updatePlace = async (params) => {
  //Updates users place to persist next images to show
  const { userId, photoId } = params;
  const query = `UPDATE users SET place = ${photoId} WHERE id = ${userId};`;
  const updatePlaceQuery = await client.query(query);
  try {
    if (!updatePlaceQuery.rowCount) {
      return ({status: false});
    } else if (updatePlaceQuery.rowCount){
      return ({status: true});
    }
  } catch (err) {
    console.log('Error in updating place');
    return {
      status: false,
      error: err
    };
  }
}

module.exports = {
  checkLogin,
  checkEmail,
  checkUserId,
  signUp,
  userPhotoImpression,
  getUserLikes,
  getUserRecommendations,
  addPhotoToDatabase,
  updatePlace
};
