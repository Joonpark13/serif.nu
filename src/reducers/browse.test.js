import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { fetchSchools, fetchSubjects, fetchCourses } from 'effects/browse';
import {
  getSchoolsSuccess,
  getSchoolsFailure,
  fetchSubjectsSuccess,
  fetchSubjectsFailure,
  fetchCoursesSuccess,
  fetchCoursesFailure,
} from 'actions';
import browseReducer, { initialBrowseState } from './browse';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('browse reducer', () => {
  it('should return initial state', () => {
    expect(browseReducer(undefined, {})).toEqual(initialBrowseState);
  });

  it(`should handle ${actionTypes.GET_SCHOOLS_REQUEST}`, () => {
    const state = fromJS({
      isFetching: false,
    });
    const action = actionCreators.getSchoolsRequest();

    expect(browseReducer(state, action)).toEqual(
      loop(
        fromJS({
          isFetching: true,
        }),
        Cmd.run(fetchSchools, {
          successActionCreator: getSchoolsSuccess,
          failActionCreator: getSchoolsFailure,
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.GET_SCHOOLS_SUCCESS}`, () => {
    const state = fromJS({
      isFetching: true,
      schools: [],

    });
    const testResults = [
      {
        _id: '5bab37ef1080c00004622388',
        id: 'MUSIC',
        name: 'Bienen School of Music',
        term: '4720',
        type: 'school',
      },
    ];
    const action = actionCreators.getSchoolsSuccess(testResults);

    expect(browseReducer(state, action)).toEqual(fromJS({
      isFetching: false,
      schools: testResults,
    }));
  });

  it(`should handle ${actionTypes.GET_SCHOOLS_FAILURE}`, () => {
    const state = fromJS({
      isFetching: false,
      schools: [],
    });
    const action = actionCreators.getSchoolsFailure();

    expect(browseReducer(state, action)).toEqual(state);
  });

  it(`should handle ${actionTypes.FETCH_SUBJECTS_REQUEST}`, () => {
    const state = fromJS({
      isFetching: false,
    });
    const action = actionCreators.fetchSubjectsRequest();

    expect(browseReducer(state, action)).toEqual(
      loop(
        fromJS({
          isFetching: true,
        }),
        Cmd.run(fetchSubjects, {
          args: [action.schoolId],
          successActionCreator: fetchSubjectsSuccess,
          failActionCreator: fetchSubjectsFailure,
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.FETCH_SUBJECTS_SUCCESS}`, () => {
    const state = fromJS({
      isFetching: true,
      subjects: [],
    });

    const subjectsResults = [
      {
        id: 'ART',
        name: 'Art Theory & Practice',
        schoolId: 'WCAS',
        termId: '4730',
      },
    ];

    const action = actionCreators.fetchSubjectsSuccess(subjectsResults);

    expect(browseReducer(state, action)).toEqual(
      fromJS({
        isFetching: false,
        subjects: [{
          id: 'ART',
          name: 'Art Theory & Practice',
          schoolId: 'WCAS',
          termId: '4730',
        }],
      }),
    );
  });

  it(`should handle ${actionTypes.FETCH_SUBJECTS_FAILURE}`, () => {
    const state = fromJS({
      isFetching: false,
      subjects: [],
    });
    const action = actionCreators.fetchSubjectsFailure();

    expect(browseReducer(state, action)).toEqual(state);
  });

  it(`should handle ${actionTypes.CHANGE_BROWSE_LEVEL}`, () => {
    const state = fromJS({
      currentBrowseLevel: 'school',
    });
    const action = actionCreators.changeBrowseLevel('subject');

    expect(browseReducer(state, action)).toEqual(
      fromJS({
        currentBrowseLevel: 'subject',
      }),
    );
  });

  it(`should handle ${actionTypes.FETCH_COURSES_REQUEST}`, () => {
    const state = fromJS({
      isFetching: false,
    });
    const action = actionCreators.fetchCoursesRequest();

    expect(browseReducer(state, action)).toEqual(
      loop(
        fromJS({
          isFetching: true,
        }),
        Cmd.run(fetchCourses, {
          args: [action.schoolId, action.subjectId],
          successActionCreator: fetchCoursesSuccess,
          failActionCreator: fetchCoursesFailure,
        }),
      ),
    );
  });

  it(`should handle ${actionTypes.FETCH_COURSES_SUCCESS}`, () => {
    const testState = initialBrowseState.set('isFetching', true);

    const coursesResults = [{ id: '101-0' }];

    const action = actionCreators.fetchCoursesSuccess(coursesResults);

    expect(browseReducer(testState, action)).toEqual(
      initialBrowseState.merge({
        isFetching: false,
        courses: fromJS(coursesResults),
      }),
    );
  });

  it(`should handle ${actionTypes.FETCH_COURSES_FAILURE}`, () => {
    const testState = initialBrowseState.set('isFetching', true);
    const action = actionCreators.fetchCoursesFailure();

    expect(browseReducer(testState, action)).toEqual(initialBrowseState);
  });

  it(`should handle ${actionTypes.CHANGE_BROWSE_LEVEL} when going up levels`, () => {
    const state = fromJS({
      subjects: [{}],
      currentBrowseLevel: 'subject',
      selected: {
        school: {},
        subject: null,
      },
    });
    const action = actionCreators.changeBrowseLevel('school');

    expect(browseReducer(state, action)).toEqual(
      fromJS({
        subjects: [],
        currentBrowseLevel: 'school',
        selected: {
          school: null,
          subject: null,
        },
      }),
    );
  });

  it(`should handle ${actionTypes.SELECT_SCHOOL_IN_BROWSE}`, () => {
    const schoolId = '12345';
    const school = fromJS({ id: schoolId });
    const state = fromJS({
      schools: [school],
      selected: {
        school: null,
      },
    });
    const action = actionCreators.selectSchoolInBrowse(schoolId);

    expect(browseReducer(state, action).getIn(['selected', 'school'])).toEqual(school);
  });

  it(`should handle ${actionTypes.SELECT_SUBJECT_IN_BROWSE}`, () => {
    const subjectId = 'EECS';
    const subject = fromJS({ id: subjectId });
    const state = fromJS({
      subjects: [subject],
      selected: {
        subject: null,
      },
    });
    const action = actionCreators.selectSubjectInBrowse(subjectId);

    expect(browseReducer(state, action).getIn(['selected', 'subject'])).toEqual(subject);
  });
});
