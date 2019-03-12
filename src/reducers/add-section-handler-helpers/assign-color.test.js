import { fromJS } from 'immutable';
import assignColor from './assign-color';

describe('Assign color', () => {
  it('returns sections with the correct colors assigned', () => {
    const sections = fromJS([{ color: 'blue' }, {}]);
    const color = 'red';
    expect(assignColor(color, sections)).toEqual(fromJS([{ color: 'blue' }, { color }]));
  });
});
