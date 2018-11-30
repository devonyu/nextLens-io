// Work will get the lens recommendations for the user.
// input is the amount of likes for each category and the mount the user uses
// output will be the best 10 lenses for the user
// 5 budget lens and 5 best lenses
// const LensAPI = require('../example_data_server/apiLenses');
// console.log(LensAPI['Canon']['EF Mount']['Portrait']['Low'][0]['Name'])
// returns Canon 85mm F1.2 II USM

const consolidateAffinities = affinityArray => affinityArray.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = {
      liked: 0,
      disliked: 0,
    };
  }
  if (curr.liked) {
    acc[curr.category].liked += 1;
  } else {
    acc[curr.category].disliked += 1;
  }
  return acc;
}, {});

module.exports = {
  consolidateAffinities,
};
