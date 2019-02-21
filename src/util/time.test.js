import { getFormattedClassSchedule, formatMinute, formatTime, getDurationInHours } from './time';

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

    it('formats time correctly without AM/PM', () => {
      expect(formatTime({ hour: 0, minute: 0 }, false)).toBe('12:00');
      expect(formatTime({ hour: 1, minute: 0 }, false)).toBe('1:00');
      expect(formatTime({ hour: 12, minute: 0 }, false)).toBe('12:00');
      expect(formatTime({ hour: 13, minute: 0 }, false)).toBe('1:00');
    });
  });

  describe('getFormattedClassSchedule', () => {
    const testSchedule = {
      dow: ['Mo', 'We'],
      start: {
        hour: 12,
        minute: 0,
      },
      end: {
        hour: 12,
        minute: 50,
      },
    };

    it('formats schedules correctly', () => {
      expect(getFormattedClassSchedule(testSchedule)).toBe('MoWe 12:00 PM - 12:50 PM');
    });

    it('returns TBA for any undetermined schedules', () => {
      expect(getFormattedClassSchedule({
        dow: 'TBA',
      })).toBe('TBA');
    });

    it('formats schedules correctly without dow', () => {
      expect(getFormattedClassSchedule(testSchedule, false)).toBe('12:00 PM - 12:50 PM');
    });

    it('formats schedules correctly without AM/PM', () => {
      expect(getFormattedClassSchedule(testSchedule, true, false)).toBe('MoWe 12:00 - 12:50');
    });
  });

  describe('getDurationInHours', () => {
    it('calculates duration in hours', () => {
      expect(getDurationInHours({
        start: {
          hour: 12,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 30,
        },
      })).toBe(1.5);
    });
  });
});
