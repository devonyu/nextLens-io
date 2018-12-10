const lensApi = require('../example_data_server/apiLenses');
const exampleData = require('../example_data_server/exampleUserAffinities');
const { getMount, mounts } = require('./utilities.js');

const recommendationGenerator = (affinityArray, mountId) => {
  // find 5 lens categories for the user based on likes and mount;
  const results = new Array(5);
  console.log('api=>', lensApi);
  let example = getMount(mounts, mountId);
  console.log(affinityArray.length);
  console.log(example);
  // iterate through the array and find the top 3 categories for the user
  // MVP algorithm:
  // sort them by strength of affinities, two lens recommendations for the top 2 and 1 for last
  // input is all affinities that a user has with categories and the like or dislikes
  // output should be 5 lens recommendations based on their mount
  return results;
};

console.log(recommendationGenerator(exampleData, 6));

module.exports = {
  recommendationGenerator,
};
