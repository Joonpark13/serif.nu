import { getFormattedClassSchedule, formatMinute, formatTime } from './time';

describe('time utils', () => {
  describe('formatMinute', () => {
    it('formats minutes correctly', () => {
      expect(formatMinute(1)).toBe('01');
      expect(formatMinute(10)).toBe('10');
    });
  });

  describe('formatTime', () => {
    it('formats times correctly', () => {
      expect(formatTime({ hour: 0, minute: 0 })).toBe('12:00 AM');
      expect(formatTime({ hour: 1, minute: 0 })).toBe('1:00 AM');
      expect(formatTime({ hour: 12, minute: 0 })).toBe('12:00 PM');
      expect(formatTime({ hour: 13, minute: 0 })).toBe('1:00 PM');
    });
  });

  describe('getFormattedClassSchedule', () => {
    it('formats schedules correctly', () => {
      expect(getFormattedClassSchedule({
        dow: ['Mo', 'We'],
        start: {
          hour: 12,
          minute: 0,
        },
        end: {
          hour: 12,
          minute: 50,
        },
      })).toBe('MoWe 12:00 PM - 12:50 PM');
    });
  });
});
