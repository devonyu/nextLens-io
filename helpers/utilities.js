const mounts = [
  { key: 'canon', text: 'Canon EF Mount', value: 1 },
  { key: 'canon1', text: 'Canon EF-S Mount', value: 2 },
  { key: 'nikon', text: 'Nikon F FX Mount', value: 3 },
  { key: 'nikon1', text: 'Nikon F DX Mount', value: 4 },
  { key: 'sony', text: 'Sony E Mount FF', value: 5 },
  { key: 'sony1', text: 'Sony E Mount Crop', value: 6 },
  { key: 'fujifilm', text: 'Fujifilm X Mount', value: 7 },
];

const categoriesAPI = {
  1: 'portrait',
  2: 'landscape',
  3: 'aerial',
  4: 'street',
};

// Function will get mount
const getMount = (mountApi, mountNumber) => mountApi.reduce((acc, cur) => {
  if (cur.value.toString() === mountNumber) {
    acc = cur.text;
  }
  return acc;
}, '');

const consolidateAffinities = affinityArray => affinityArray.reduce((acc, curr) => {
  if (!acc[curr.category]) {
    acc[curr.category] = {
      liked: 0,
      disliked: 0,
    };
  }
  if (curr.liked) {
    acc[curr.category].liked += 1;
  } else if (!curr.liked) {
    acc[curr.category].disliked += 1;
  }
  return acc;
}, {});

module.exports = {
  mounts, getMount, consolidateAffinities, categoriesAPI,
};
