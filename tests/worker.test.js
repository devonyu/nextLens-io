const worker = require('../server/worker.js');

const affinities = [
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 3,
    liked: false,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 2,
    liked: true,
  },
  {
    category: 2,
    liked: true,
  },
  {
    category: 2,
    liked: true,
  },
  {
    category: 2,
    liked: true,
  },
  {
    category: 4,
    liked: true,
  },
  {
    category: 4,
    liked: true,
  },
  {
    category: 4,
    liked: true,
  },
  {
    category: 4,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 3,
    liked: true,
  },
  {
    category: 2,
    liked: false,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: false,
  },
  {
    category: 1,
    liked: true,
  },
  {
    category: 1,
    liked: false,
  },
];

test('consolidateAffinities should return correctly', () => {
  expect(worker.consolidateAffinities(affinities)).toEqual({
    1: { liked: 14, disliked: 8 },
    2: { liked: 4, disliked: 1 },
    3: { liked: 8, disliked: 1 },
    4: { liked: 4, disliked: 0 },
  });
});
