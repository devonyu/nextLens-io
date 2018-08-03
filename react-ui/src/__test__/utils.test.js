//TEST Suite For Util functions
import { evenlyDistributedImages, shuffleImages } from '../../src/components/utils';

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
}

describe('Evenly Distribute Images', () => {
  let evenDistributeImagesTest = evenlyDistributedImages([api.portait1, api.aerial1, api.landscape1]);
  it('should return an array', () => {
    expect(Array.isArray(evenDistributeImagesTest)).toBe(true);
  });
    it('should have the correct amount of images', () => {
        expect(evenDistributeImagesTest).toHaveLength(12);
    });
    it('should evenly distribute images in array', () => {
      expect(evenDistributeImagesTest[0]).toEqual({pimage1: 'datap1'});
      expect(evenDistributeImagesTest[3]).toEqual({pimage2: 'datap2'});
      expect(evenDistributeImagesTest[1]).toEqual({aimage1: 'dataa1'});
      expect(evenDistributeImagesTest[4]).toEqual({aimage2: 'dataa2'});
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