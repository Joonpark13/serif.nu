import { fromJS } from 'immutable';
import { subjectsSelector } from './SubjectsContainer';

describe('subjectsSelector', () => {
  it('should select subjects from browse state', () => {
    const subjects = fromJS([{ id: 'EECS', schoolId: 'WCAS' }]);
    const testState = fromJS({
      browse: {
        subjects,
      },
    });

    expect(subjectsSelector(testState)).toEqual(subjects);
  });
});
