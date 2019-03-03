import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import { fetchSchools, fetchSubjects } from 'effects/browse';
import { getSchoolsSuccess, getSchoolsFailure, fetchSubjectsSuccess, fetchSubjectsFailure } from 'actions';
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
});
