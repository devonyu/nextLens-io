//TEST Suite For Util functions
import { evenlyDistributedImages, getMount, mounts, shuffleImages } from '../../src/components/utils';

const mountsTest = [
  { key: 'canon', text: 'Canon EF Mount', value: 1 },
  { key: 'canon1', text: 'Canon EF-S Mount', value: 2 },
  { key: 'nikon', text: 'Nikon F FX Mount', value: 3 },
];

const api = {
      portait1: [
        {pimage1: 'datap1'},
        {pimage2: 'datap2'},
        {pimage3: 'datap3'},
        {pimage4: 'datap4'}
      ],
      aerial1: [
        {aimage1: 'dataa1'},
        {aimage2: 'dataa2'},
        {aimage3: 'dataa3'},
        {aimage4: 'dataa4'}
      ],
      landscape1: [
        {limage1: 'datal1'},
        {limage2: 'datal2'},
        {limage3: 'datal3'},
        {limage4: 'datal4'}
      ]
};

describe('Camera Mount API', () => {
  it('should be an array', () => {
    expect(Array.isArray(mounts)).toBe(true);
  });
  it('should contain objects', () => {
    mounts.forEach((mount) => {
      expect(typeof mount).toBe('object')
    })
  });
  it('should contain the key text representing mount name', () => {
    mounts.forEach((mount) => {
      expect(mount.text).toBeDefined();
    })
  });
  it('should contain a key value representing mount id', () => {
    mounts.forEach((mount) => {
      expect(mount.value).toBeDefined();
    })
  });
});

describe('Get Mount', () => {
  it('should correctly return mount text from given mount ID', () => {
    expect(getMount(1, mountsTest)).toBe('Canon EF Mount');
    expect(getMount(2, mountsTest)).toBe('Canon EF-S Mount');
    expect(getMount(3, mountsTest)).toBe('Nikon F FX Mount');
  });
});

describe('Evenly Distribute Images', () => {
  let evenDistributeImagesTest = evenlyDistributedImages([api.portait1, api.aerial1, api.landscape1]);
  it('should return an array', () => {
    expect(Array.isArray(evenDistributeImagesTest)).toBe(true);
  });
    it('should have the correct amount of images', () => {
        expect(evenDistributeImagesTest).toHaveLength(12);
    });
    it('should add a .nlid property to image for mock api data', () => {
      expect(evenDistributeImagesTest[0]).toHaveProperty('nlid');
      expect(evenDistributeImagesTest[3]).toHaveProperty('nlid');
      expect(evenDistributeImagesTest[1]).toHaveProperty('nlid');
      expect(evenDistributeImagesTest[4]).toHaveProperty('nlid');
  });
  it('should have the .nlid property to be an integer', () => {
    expect(evenDistributeImagesTest[0].nlid).toBe(1);
    expect(evenDistributeImagesTest[3].nlid).toBe(2);
    expect(evenDistributeImagesTest[1].nlid).toBe(5);
    expect(evenDistributeImagesTest[4].nlid).toBe(6);
});
    it('should evenly distribute images in array', () => {
      expect(evenDistributeImagesTest[0]).toHaveProperty('pimage1', 'datap1');
      expect(evenDistributeImagesTest[3]).toHaveProperty('pimage2', 'datap2');
      expect(evenDistributeImagesTest[1]).toHaveProperty('aimage1', 'dataa1');
      expect(evenDistributeImagesTest[4]).toHaveProperty('aimage2', 'dataa2');
  });
});

describe('Shuffle Images', () => {
  let shuffleImagesTest = shuffleImages([api.portait1, api.aerial1, api.landscape1]);
  let shuffleImagesTest2 = shuffleImages([api.portait1, api.aerial1, api.landscape1]);
  it('should return an array', () => {
    expect(Array.isArray(shuffleImagesTest)).toBe(true);
  });
  it('should have the correct amount of images', () => {
      expect(shuffleImagesTest).toHaveLength(12);
  });
  it('should shuffle an array', () => {
    expect(shuffleImagesTest).not.toEqual(shuffleImagesTest2);
  });
});

