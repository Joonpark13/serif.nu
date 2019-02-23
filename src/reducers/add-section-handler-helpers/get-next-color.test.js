import { fromJS } from 'immutable';
import getNextColor from './get-next-color';

describe('getNextColor', () => {
  it('returns correct next color', () => {
    const colorUses = fromJS({
      color1: 0,
      color2: 1,
    });
    expect(getNextColor(colorUses)).toBe('color1');
  });

  it('returns correct next color when all have been used', () => {
    const colorUses = fromJS({
      color1: 2,
      color2: 1,
    });
    expect(getNextColor(colorUses)).toBe('color2');
  });
});
