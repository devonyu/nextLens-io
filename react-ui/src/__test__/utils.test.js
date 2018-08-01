//TEST Suite For Util functions
import { evenlyDistributedImages } from '../../src/components/utils';

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

// test('Test EvenlyDistributed Images', () => {
//     expect(evenlyDistributedImages([api.portait1, api.aerial1, api.landscape1])).toHaveLength(12);
//   });

describe('Evenly Distribute Images', () => {
    it('should have the correct amount of images', () => {
        expect(evenlyDistributedImages([api.portait1, api.aerial1, api.landscape1])).toHaveLength(12);
    });
    it('should return an array', () => {
        expect(Array.isArray(evenlyDistributedImages([api.portait1, api.aerial1, api.landscape1]))).toBe(true);
    });
});