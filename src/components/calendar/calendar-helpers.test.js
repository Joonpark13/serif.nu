import { getHours } from './calendar-helpers';

describe('getHours', () => {
  it('returns hours 8AM through 10PM in 24hr format', () => {
    expect(getHours()).toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
  });
});
