// const axios = require('axios');

// TODO
// Try to make these work and import them to photos route

// export async function getRandomPictures() {
  // axios.get(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`, {
  //   params: {
  //     count: 30,
  //   },
  // })
  // .then((result) => {
  //     //console.log(result.data)
  //     return JSON.stringify(result.data);
  //   })
  // .catch((err) => {
  //     console.log('error in axios=> ', err)
  //   })
  // try{
  //   const results = await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_URL}`);
  //   return results;
  // } catch (e) {
  //   console.log(e)
  // }
// }

// export function getPortraitPictures() {
  // axios.get(`https://api.unsplash.com/collections/1606374/?client_id=${process.env.UNSPLASH_URL}`, {
  //   params: {
  //     count: 30,
  //   },
  // })
  // .then((result) => {
  //   //console.log(result.data)
  //   return JSON.stringify(result.data);
  // })
  // .catch((err) => {
  //   console.log('error in axios=> ', err)
  // })
// }

function parseStringSQL(input) {
  //fixes string for correct sql input
  let result = '';
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "'") {
      result += "'";
    }
    result += input[i];
  }
  return result;
}

module.exports = {
  parseStringSQL
}