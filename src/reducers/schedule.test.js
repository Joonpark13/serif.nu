import { fromJS } from 'immutable';
/* eslint-disable import/no-duplicates */
import * as scheduleHelpers from './schedule';
import scheduleReducer, { initialScheduleState } from './schedule';
/* eslint-enable */
import * as actionTypes from '../actions/action-types';
import * as actionCreators from '../actions/index';

describe('schedule reducer', () => {
  it('should return initial state', () => {
    expect(scheduleReducer(undefined, {})).toEqual(initialScheduleState);
  });

  it(`should handle ${actionTypes.ADD_SECTION}`, () => {
    const section = {
      id: 12345,
      section: '20',
      class_mtg_info: [{
        meet_l: 'some location',
        meet_t: 'MoWe 10:00AM - 10:50AM',
      }],
    };
    const action = actionCreators.addSection(section);

    const expectedSection = fromJS(section).set('schedule', fromJS([{
      dow: ['Mo', 'We'],
      start: {
        hour: 10,
        minute: 0,
      },
      end: {
        hour: 10,
        minute: 50,
      },
    }]));

    expect(scheduleReducer(initialScheduleState, action))
      .toEqual(initialScheduleState.set('sections', initialScheduleState.get('sections').push(expectedSection)));
  });
});

describe('parseHour', () => {
  const { parseHour } = scheduleHelpers;

  it('parses am correctly', () => {
    expect(parseHour('11:00AM')).toBe(11);
  });

  it('parses pm correctly', () => {
    expect(parseHour('3:00PM')).toBe(15);
  });

  it('parses midnight correctly', () => {
    expect(parseHour('12:00AM')).toBe(0);
  });

  it('parses noon correctly', () => {
    expect(parseHour('12:00PM')).toBe(12);
  });
});

describe('parseMinute', () => {
  const { parseMinute } = scheduleHelpers;

  it('parses minute string correctly', () => {
    expect(parseMinute('5:30PM')).toBe(30);
  });
});

describe('parseMeetingTime', () => {
  const { parseMeetingTime } = scheduleHelpers;

  it('parses meeting times', () => {
    const meetingTime = 'MoWe 11:00AM - 12:50PM';
    jest.spyOn(scheduleHelpers, 'parseHour').mockReturnValueOnce(11);
    jest.spyOn(scheduleHelpers, 'parseHour').mockReturnValueOnce(12);
    jest.spyOn(scheduleHelpers, 'parseMinute').mockReturnValueOnce(0);
    jest.spyOn(scheduleHelpers, 'parseMinute').mockReturnValueOnce(50);

    expect(parseMeetingTime(meetingTime)).toEqual({
      dow: ['Mo', 'We'],
      start: {
        hour: 11,
        minute: 0,
      },
      end: {
        hour: 12,
        minute: 50,
      },
    });
  });

  it('returns TBA if meeting time is TBA', () => {
    expect(parseMeetingTime('TBA')).toBe('TBA');
  });
});
