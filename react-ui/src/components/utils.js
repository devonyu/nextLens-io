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
// Function will get mount
export function getMount(mountNumber, mountApi) {
  for (const key of mountApi) {
    if (key.value === mountNumber) {
      return key.text;
    }
  }
  return null;
}

// Function that will randomize image order
export function shuffleImages(photos) {
  const finalResults = [];
  Object.keys(photos).forEach((categoryArray, i) => {
    finalResults[i] = photos[categoryArray];
  });
  const flattedResults = _.flatten(finalResults);
  const shuffledResults = _.shuffle(flattedResults);
  return shuffledResults;
}

// Function that will combine image categories with an even distribution
export function evenlyDistributedImages(photos) {
  const categoryResults = [];
  Object.keys(photos).forEach((categoryArray, i) => {
    categoryResults[i] = photos[categoryArray];
  });
  const result = new Array(categoryResults.length * categoryResults[0].length);
  return categoryResults.reduce((finalArray, current, idx, categoryArr) => {
    current.forEach((imageObj, insideIndex) => {
      finalArray[insideIndex * categoryArr.length + idx] = imageObj;
    });
    return finalArray;
  }, result);
}
