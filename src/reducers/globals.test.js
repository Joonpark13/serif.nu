import { fromJS } from 'immutable';
import { loop, Cmd } from 'redux-loop';
import {
  fetchCurrentTermSuccess,
  fetchCurrentTermFailure,
  fetchSchoolsRequest,
  fetchSearchIndex,
} from 'actions';
import { fetchCurrentTerm } from 'effects/globals';
import globalsReducer, { initialGlobalsState } from './globals';
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

jest.mock('effects/globals');

describe('globals reducer', () => {
  it('should return initial state', () => {
    expect(globalsReducer(undefined, {})).toEqual(initialGlobalsState);
  });

  it(`should handle ${actionTypes.FETCH_CURRENT_TERM_REQUEST}`, () => {
    const state = fromJS({
      isFetching: false,
    });
    const action = actionCreators.fetchCurrentTermRequest();

    expect(globalsReducer(state, action)).toEqual(
      loop(
        fromJS({
          isFetching: true,
        }),
        Cmd.run(fetchCurrentTerm, {
          successActionCreator: fetchCurrentTermSuccess,
          failActionCreator: fetchCurrentTermFailure,
        }),
      ),
    );
  });

  describe(`should handle ${actionTypes.FETCH_CURRENT_TERM_SUCCESS}`, () => {
    const state = fromJS({
      isFetching: true,
      currentTerm: {},
    });
    const testResult = [
      {
        id: '4780',
        name: 'Fall 2019',
      },
    ];
    const action = actionCreators.fetchCurrentTermSuccess(testResult);

    expect(globalsReducer(state, action)).toEqual(
      loop(
        fromJS({
          isFetching: false,
          currentTerm: {
            id: '4780',
            name: 'Fall 2019',
          },
        }),
        Cmd.list([
          Cmd.action(fetchSchoolsRequest()),
          Cmd.action(fetchSearchIndex()),
        ]),
      ),
    );
  });

  describe(`should handle ${actionTypes.FETCH_CURRENT_TERM_FAILURE}`, () => {
    const state = fromJS({
      isFetching: false,
      currentTerm: {},
    });
    const action = actionCreators.fetchCurrentTermFailure();

    expect(globalsReducer(state, action)).toEqual(state);
  });
});
