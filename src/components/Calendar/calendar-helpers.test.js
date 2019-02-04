import { getHours, meetsDuringDow, meetsDuringHour, getScheduleObjGivenHourAndDow } from './calendar-helpers';

describe('getHours', () => {
  it('returns hours 8AM through 10PM in 24hr format', () => {
    expect(getHours()).toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
  });
});

describe('meetsDuringDow', () => {
  it('returns true if a schedule object meets during a certain day of week', () => {
    const scheduleObj = {
      dow: ['Mo'],
    };
    expect(meetsDuringDow(scheduleObj, 'Mo')).toBe(true);
  });
});

describe('meetsDuringHour', () => {
  it('returns true if a schedule object meets during a certain hour', () => {
    const scheduleObj = {
      start: {
        hour: 12,
        minute: 0,
      },
      end: {
        hour: 13,
        minute: 30,
      },
    };
    expect(meetsDuringHour(scheduleObj, 12)).toBe(true);
  });
});

describe('getScheduleObjGivenHourAndDow', () => {
  it('returns a schedule object that is within a given dow and hour', () => {
    const testSchedule = {
      dow: ['Mo'],
      start: {
        hour: 10,
        minute: 0,
      },
      end: {
        hour: 11,
        minute: 50,
      },
    };
    const testSchedules = [testSchedule];
    expect(getScheduleObjGivenHourAndDow(testSchedules, 10, 'Mo')).toEqual(testSchedule);
  });
});
