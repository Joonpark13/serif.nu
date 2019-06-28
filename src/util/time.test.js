import {
  getFormattedClassSchedule,
  formatMinute,
  formatTime,
  getDurationInHours,
  isBefore,
  overlaps,
  getFormattedEventTime,
  isUnscheduled,
  meetsDuringDow,
  meetsDuringHour,
} from './time';

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

  describe('getFormattedEventTime', () => {
    const testEvent = {
      dow: 'Mo',
      start: {
        hour: 12,
        minute: 0,
      },
      end: {
        hour: 12,
        minute: 50,
      },
    };

    it('formats events correctly', () => {
      expect(getFormattedEventTime(testEvent)).toBe('12:00 - 12:50');
    });

    it('returns TBA for any undetermined events', () => {
      expect(getFormattedEventTime({
        dow: 'TBA',
      })).toBe('TBA');
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

  describe('isBefore', () => {
    it('determines if the first time is before the second', () => {
      expect(isBefore({
        hour: 10,
        minute: 30,
      }, {
        hour: 11,
        minute: 0,
      })).toBe(true);

      expect(isBefore({
        hour: 12,
        minute: 0,
      }, {
        hour: 11,
        minute: 30,
      })).toBe(false);
    });

    it('handles isBefore or equal to', () => {
      expect(isBefore({
        hour: 10,
        minute: 30,
      }, {
        hour: 10,
        minute: 30,
      }, true)).toBe(true);
    });
  });

  describe('overlaps', () => {
    it('determines if two events overlap', () => {
      expect(overlaps({
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 11,
          minute: 0,
        },
      }, {
        start: {
          hour: 11,
          minute: 0,
        },
        end: {
          hour: 12,
          minute: 0,
        },
      })).toBe(true);

      expect(overlaps({
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 11,
          minute: 0,
        },
      }, {
        start: {
          hour: 11,
          minute: 30,
        },
        end: {
          hour: 12,
          minute: 0,
        },
      })).toBe(false);
    });
  });

  it('short circuits if the events\'s dows don\'t match', () => {
    expect(overlaps({ dow: 'Mo' }, { dow: 'Tu' })).toBe(false);
  });

  describe('isUnscheduled', () => {
    it('determines if the event is unscheduled', () => {
      expect(isUnscheduled({
        dow: 'TBA',
        start: 'TBA',
        end: 'TBA',
      })).toBe(true);

      expect(isUnscheduled({
        dow: 'Mo',
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 11,
          minute: 0,
        },
      })).toBe(false);
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
});
