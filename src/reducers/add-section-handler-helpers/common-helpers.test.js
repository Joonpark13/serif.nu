import { fromJS } from 'immutable';
import { getSectionsByGroup } from './common-helpers';

describe('getSectionsByGroup', () => {
  it('groups sections by group labels', () => {
    const sections = fromJS([{
      group: 0,
    }, {
      group: 0,
    }, {
      group: 1,
    }]);

    expect(getSectionsByGroup(sections)).toEqual({
      0: fromJS([{ group: 0 }, { group: 0 }]),
      1: fromJS([{ group: 1 }]),
    });
  });
});
