import { fromJS } from 'immutable';
import {
  sectionsSelector,
  sectionsForHourSelector,
  associatedClassesForHourSelector,
  sectionPreviewSelector,
  associatedClassPreviewSelector,
  allSectionPreviewsSelector,
  currentBrowseLevelSelector,
  browseIsFetchingSelector,
  selectedCourseNameSelector,
  selectedSectionNumberSelector,
  selectedSectionAssociatedClassesSelector,
  selectedSchoolIdSelector,
  selectedSubjectIdSelector,
  browseSectionsSelector,
  coursesSelector,
  schoolsSelector,
  subjectsSelector,
  currentCourseNameSelector,
  currentSectionNumberSelector,
  currentAssociatedClassesSelector,
  currentSearchInputSelector,
  searchViewSelector,
  searchResultsSelector,
  searchIsFetchingSelector,
  currentSectionsSelector,
  currentTermSelector,
} from './index';

describe('sectionsSelctor', () => {
  it('should select sections from schedule state', () => {
    const testSections = fromJS([]);
    const testState = fromJS({
      schedule: {
        sections: testSections,
      },
    });

    expect(sectionsSelector(testState)).toEqual(testSections);
  });
});

describe('sectionsForHourSelector', () => {
  it('selects all sections for a given hour and dow', () => {
    const testSection = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const testState = fromJS({
      schedule: {
        sections: [testSection],
      },
    });
    expect(sectionsForHourSelector(testState, 13, 'Mo')).toEqual(fromJS([testSection]));
  });
});

describe('associatedClassesForHourSelector', () => {
  it('selects all associated classes for a given hour and dow', () => {
    const testAssociatedClass = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const testState = fromJS({
      schedule: {
        associatedClasses: [testAssociatedClass],
      },
    });
    expect(associatedClassesForHourSelector(testState, 13, 'Mo'))
      .toEqual(fromJS([testAssociatedClass]));
  });
});

describe('sectionPreviewSelector', () => {
  it('selects section preview from the schedule state', () => {
    const previewSection = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const state = fromJS({
      schedule: {
        sectionPreview: [previewSection],
      },
    });

    expect(sectionPreviewSelector(state, 13, 'Mo')).toEqual(previewSection);
  });
});

describe('associatedClassPreviewSelector', () => {
  it('selects associated class preview from the schedule state', () => {
    const previewAssociatedClass = fromJS({
      event: {
        dow: ['Mo'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      },
    });
    const state = fromJS({
      schedule: {
        associatedClassPreview: [previewAssociatedClass],
      },
    });

    expect(associatedClassPreviewSelector(state, 13, 'Mo'))
      .toEqual(previewAssociatedClass);
  });
});

describe('allSectionPreviewsSelector', () => {
  it('selects all section previews', () => {
    const sectionPreview = fromJS([]);
    const state = fromJS({
      schedule: {
        sectionPreview,
      },
    });
    expect(allSectionPreviewsSelector(state)).toEqual(sectionPreview);
  });
});

describe('currentBrowseLevelSelector', () => {
  it('should select current browse level from browse state', () => {
    const currentBrowseLevel = 'school';
    const testState = fromJS({
      browse: {
        currentBrowseLevel,
      },
    });

    expect(currentBrowseLevelSelector(testState)).toEqual(currentBrowseLevel);
  });
});

describe('browseIsFetchingSelector', () => {
  it('should select isFetching from browse state', () => {
    const testIsFetchingResults = fromJS([{ isFetching: false }]);
    const testState = fromJS({
      browse: {
        isFetching: testIsFetchingResults,
      },
    });

    expect(browseIsFetchingSelector(testState)).toEqual(testIsFetchingResults);
  });
});

describe('selectedCourseNameSelector', () => {
  it('should select selected course name from browse state', () => {
    const name = 'Introduction to Something';
    const state = fromJS({
      browse: {
        selected: {
          course: {
            name,
          },
        },
      },
    });

    expect(selectedCourseNameSelector(state)).toBe(name);
  });
});

describe('selectedSectionNumberSelector', () => {
  it('should select selected section number from browse state', () => {
    const sectionNumber = '20';
    const testState = fromJS({
      browse: {
        selected: {
          section: {
            sectionNumber,
          },
        },
      },
    });

    expect(selectedSectionNumberSelector(testState)).toEqual(sectionNumber);
  });
});

describe('selectedSectionAssociatedClassesSelector', () => {
  it("should select selected section's associated classes from browse state", () => {
    const associatedClasses = fromJS([]);
    const testState = fromJS({
      browse: {
        selected: {
          section: {
            associatedClasses,
          },
        },
      },
    });

    expect(selectedSectionAssociatedClassesSelector(testState)).toEqual(associatedClasses);
  });
});

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

describe('sectionsSelector', () => {
  it('should select selected section number from browse state', () => {
    const sections = fromJS([]);
    const testState = fromJS({
      browse: {
        sections,
      },
    });

    expect(browseSectionsSelector(testState)).toEqual(sections);
  });
});

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

describe('currentCourseNameSelector', () => {
  it('should select current course name from state', () => {
    const currentCourseName = 'Some Course Name';
    const testState = fromJS({
      search: {
        currentCourseName,
      },
    });

    expect(currentCourseNameSelector(testState)).toEqual(currentCourseName);
  });
});

describe('currentSectionNumberSelector', () => {
  it('should select current section number from state', () => {
    const currentSectionNumber = '78719';
    const testState = fromJS({
      search: {
        currentSectionNumber,
      },
    });

    expect(currentSectionNumberSelector(testState)).toEqual(currentSectionNumber);
  });
});

describe('currentAssociatedClassesSelector', () => {
  it('should select current section number from state', () => {
    const currentAssociatedClasses = [];
    const testState = fromJS({
      search: {
        currentAssociatedClasses,
      },
    });

    expect(currentAssociatedClassesSelector(testState)).toEqual(fromJS(currentAssociatedClasses));
  });
});

describe('currentSearchInputSelector', () => {
  it('should select current search input from state', () => {
    const testSearchInput = 'EECS';
    const testState = fromJS({
      search: {
        currentSearchInput: testSearchInput,
      },
    });

    expect(currentSearchInputSelector(testState)).toEqual(testSearchInput);
  });
});

describe('searchViewSelector', () => {
  it('should select view of sidebar from state', () => {
    const testSearchView = 'search';
    const testState = fromJS({
      search: {
        view: testSearchView,
      },
    });

    expect(searchViewSelector(testState)).toEqual(testSearchView);
  });
});

describe('searchResultsSelector', () => {
  it('should select search results from state', () => {
    const testSearchResults = fromJS([{ name: 'My Course ' }]);
    const testState = fromJS({
      search: {
        results: testSearchResults,
      },
    });

    expect(searchResultsSelector(testState)).toEqual(testSearchResults);
  });
});

describe('searchIsFetchingSelector', () => {
  it('should select isFetching from state', () => {
    const testIsFetchingResults = fromJS([{ isFetching: false }]);
    const testState = fromJS({
      search: {
        isFetching: testIsFetchingResults,
      },
    });

    expect(searchIsFetchingSelector(testState)).toEqual(testIsFetchingResults);
  });
});

describe('currentSectionsSelector', () => {
  it('should select current sections from state', () => {
    const testSections = fromJS([]);
    const testState = fromJS({
      search: {
        currentSections: testSections,
      },
    });

    expect(currentSectionsSelector(testState)).toEqual(testSections);
  });
});

describe('currentTermSelector', () => {
  it('should select current term from state', () => {
    const testCurrentTerm = fromJS({});
    const testState = fromJS({
      globals: {
        currentTerm: testCurrentTerm,
      },
    });

    expect(currentTermSelector(testState)).toEqual(testCurrentTerm);
  });
});
