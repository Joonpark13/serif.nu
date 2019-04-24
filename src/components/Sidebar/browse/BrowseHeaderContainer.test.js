import { fromJS } from 'immutable';
import { selectedSchoolIdSelector, selectedSubjectIdSelector } from './BrowseHeaderContainer';

describe('selectedSchoolIdSelector', () => {
  it('should select selected school id from browse state', () => {
    const id = 'WCAS';
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

describe('selectedSubjectIdSelector', () => {
  it('should select selected subject id from browse state', () => {
    const id = 'EECS';
    const testState = fromJS({
      browse: {
        selected: {
          subject: {
            id,
          },
        },
      },
    });

    expect(selectedSubjectIdSelector(testState)).toEqual(id);
  });
});
