const lensApi = require('../example_data_server/apiLenses');
// const exampleData = require('../example_data_server/exampleUserAffinities');
const {
  categoriesAPI, consolidateAffinities, getMount, mounts,
} = require('./utilities.js');

const recommendationGenerator = async (affinityArray, mountId) => {
  // find 3 lens categories for the user based on likes and mount and 2 lenses
  try {
    const results = new Array(6);
    // console.log('Affinities received: ', affinityArray.length);
    const mount = await getMount(mounts, mountId);
    const brandName = mount.split(' ')[0].toLowerCase();
    // console.log('User has brand: ', brandName);
    const formatted = await consolidateAffinities(affinityArray);
    Object.keys(formatted).forEach((categoryId) => {
      formatted[categoryId] = formatted[categoryId].liked - formatted[categoryId].disliked;
    });
    // Sort Category IDs by formated scores
    const sorttedArray = await Object.keys(formatted).sort((a, b) => formatted[b] - formatted[a]);

    await sorttedArray.forEach((category, idx) => {
      // Return the top three categories and lenses
      if (idx <= 2) {
        results[idx] = lensApi[brandName][mountId][categoriesAPI[category]].low[0];
        results[idx + 3] = lensApi[brandName][mountId][categoriesAPI[category]].high[0];
      }
    });
    return results;
  } catch (err) {
    console.log('error', err);
    return err;
  }
};

// console.log(recommendationGenerator(exampleData, 1));

module.exports = {
  recommendationGenerator,
};
