import { fromJS } from 'immutable';
import { selectedSchoolIdSelector } from './BrowseHeaderContainer';

describe('selectedSchoolIdSelector', () => {
  it('should select selected school id from browse state', () => {
    const id = '12345';
    const testState = fromJS({
      browse: {
        selected: {
          school: {
            id,
          },
        },
      },
    });

    expect(selectedSchoolIdSelector(testState)).toEqual(id);
  });
});
