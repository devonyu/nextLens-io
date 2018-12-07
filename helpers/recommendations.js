const recommendationGenerator = (affinityArray) => {
  // find 5 lens categories for the user;
  const results = new Array(5);
  // iterate through the array and find the top 3 categories for the user
  // MVP algorithm:
  // sort them by strength of affinities, two lens recommendations for the top 2 and 1 for last
  // input is all affinities that a user has with categories and the like or dislikes
  // output should be 5 lens recommendations based on their mount
  return results;
};

module.exports = {
  recommendationGenerator,
};
