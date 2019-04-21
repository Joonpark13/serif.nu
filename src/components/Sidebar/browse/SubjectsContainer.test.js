import { fromJS } from 'immutable';
import { subjectsSelector, isFetchingSelector } from './SubjectsContainer';

describe('subjectsSelector', () => {
  it('should select subjects from browse state', () => {
    const subjects = fromJS([]);
    const testState = fromJS({
      browse: {
        subjects,
      },
    });

    expect(subjectsSelector(testState)).toEqual(subjects);
  });
});

describe('isFetchingSelector', () => {
  it('should select isFetching from browse state', () => {
    const isFetching = true;
    const testState = fromJS({
      browse: {
        isFetching,
      },
    });

    expect(isFetchingSelector(testState)).toEqual(isFetching);
  });
});
