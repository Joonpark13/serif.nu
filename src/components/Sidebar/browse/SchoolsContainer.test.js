import { fromJS } from 'immutable';
import { schoolsSelector } from './SchoolsContainer';

describe('schoolsSelector', () => {
  it('should select school results from state', () => {
    const testSchoolResults = fromJS([{ name: 'Bienen School of Music' }]);
    const testState = fromJS({
      browse: {
        schools: [
          { name: 'Bienen School of Music' },
        ],
      },
    });

    expect(schoolsSelector(testState)).toEqual(testSchoolResults);
  });
});
