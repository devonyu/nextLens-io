import * as _ from 'lodash';

export const mounts = [
      { key: 'canon', text: 'Canon EF Mount', value: 1 },
      { key: 'canon1', text: 'Canon EF-S Mount', value: 2 },
      { key: 'nikon', text: 'Nikon F FX Mount', value: 3 },
      { key: 'nikon1', text: 'Nikon F DX Mount', value: 4 },
      { key: 'sony', text: 'Sony E Mount FF', value: 5 },
      { key: 'sony1', text: 'Sony E Mount Crop', value: 6 },
      { key: 'fujifilm', text: 'Fujifilm X Mount', value: 7 }
];

  // // Function that will randomize image order
  export function shuffleImages(photoCategories) {
    const finalResults = [];
    photoCategories.forEach((category,i) => {
      finalResults[i] = category;
    });
    const flattedResults = _.flatten(finalResults);
    const shuffledResults = _.shuffle(flattedResults);
    return shuffledResults;
};

  // // Function that will combine image categories with an even distribution
export function evenlyDistributedImages(photoCategories) {
    const finalResults = new Array(photoCategories[0].length);
      for (let i = 0; i < photoCategories.length; i++) {
        for (let j = 0; j < photoCategories[0].length; j++) {
          if (!finalResults[j]) {
            finalResults[j] = [];
          }
          finalResults[j][i] = photoCategories[i][j];
        }
      }
    const merged = [].concat.apply([], finalResults)
    return merged;
};