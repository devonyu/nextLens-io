const mounts = [
  { key: 'canon', text: 'Canon EF Mount', value: 1 },
  { key: 'canon1', text: 'Canon EF-S Mount', value: 2 },
  { key: 'nikon', text: 'Nikon F FX Mount', value: 3 },
  { key: 'nikon1', text: 'Nikon F DX Mount', value: 4 },
  { key: 'sony', text: 'Sony E Mount FF', value: 5 },
  { key: 'sony1', text: 'Sony E Mount Crop', value: 6 },
  { key: 'fujifilm', text: 'Fujifilm X Mount', value: 7 },
];
// Function will get mount
const getMount = (mountApi, mountNumber) => {
  return mountApi.reduce((acc, cur) => {
    if (cur.value === mountNumber) {
      console.log(cur.text);
      acc = cur.text;
    }
    console.log('acc=', acc);
    return acc;
  });
};

module.exports = {
  mounts, getMount,
};
