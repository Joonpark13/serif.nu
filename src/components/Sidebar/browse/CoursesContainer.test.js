import { fromJS } from 'immutable';
import { coursesSelector } from './CoursesContainer';

describe('coursesSelector', () => {
  it('should select courses from browse state', () => {
    const courses = fromJS([{ id: '101-0', name: 'Introduction to Something' }]);
    const testState = fromJS({
      browse: {
        courses,
      },
    });

    expect(coursesSelector(testState)).toEqual(courses);
  });
});
