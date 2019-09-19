import getSearchResultDisplayString from './get-search-result-display-string';

describe('getSearchResultDisplayString', () => {
  it('Formats display string correctly', () => {
    const course = {
      id: '101-0',
      name: 'Introduction to Something',
      subjectId: 'EECS',
    };
    expect(getSearchResultDisplayString(course))
      .toBe(`${course.subjectId} ${course.id} ${course.name}`);
  });
});
