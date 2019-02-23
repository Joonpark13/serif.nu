import { getHours, meetsDuringDow, meetsDuringHour } from './calendar-helpers';

describe('getHours', () => {
  it('returns hours 8AM through 10PM in 24hr format', () => {
    expect(getHours()).toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
  });
});

describe('meetsDuringDow', () => {
  it('returns true if an event object meets during a certain day of week', () => {
    const eventObj = {
      dow: ['Mo'],
    };
    expect(meetsDuringDow(eventObj, 'Mo')).toBe(true);
  });
});

describe('meetsDuringHour', () => {
  it('returns true if an event object meets during a certain hour', () => {
    const eventObj = {
      start: {
        hour: 12,
        minute: 0,
      },
      end: {
        hour: 13,
        minute: 30,
      },
    };
    expect(meetsDuringHour(eventObj, 12)).toBe(true);
  });
});
