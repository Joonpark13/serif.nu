import * as calendarHelpers from './calendar-helpers';

describe('getHours', () => {
  const { getHours } = calendarHelpers;

  it('returns hours 8AM through 10PM in 24hr format', () => {
    expect(getHours()).toEqual([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
  });
});

describe('parseHour', () => {
  const { parseHour } = calendarHelpers;

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
  const { parseMinute } = calendarHelpers;

  it('parses minute string correctly', () => {
    expect(parseMinute('5:30PM')).toBe(30);
  });
});

describe('parseMeetingTime', () => {
  const { parseMeetingTime } = calendarHelpers;

  it('parses meeting times', () => {
    const meetingTime = 'MoWe 11:00AM - 12:50PM';
    jest.spyOn(calendarHelpers, 'parseHour').mockReturnValueOnce(11);
    jest.spyOn(calendarHelpers, 'parseHour').mockReturnValueOnce(12);
    jest.spyOn(calendarHelpers, 'parseMinute').mockReturnValueOnce(0);
    jest.spyOn(calendarHelpers, 'parseMinute').mockReturnValueOnce(50);

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
