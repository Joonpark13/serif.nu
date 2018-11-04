import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import * as calendarHelpers from './calendar-helpers';
import { getSectionsForDow, UnstyledCalendarView, styles } from './CalendarView';

describe('getSectionsForDow', () => {
  it('filters sections correctly given a dow', () => {
    const parseMeetingTimeSpy = jest.spyOn(calendarHelpers, 'parseMeetingTime');
    parseMeetingTimeSpy.mockReturnValue({
      dow: ['Mo', 'We'],
      start: {
        hour: 11,
        minute: 0,
      },
      end: {
        hour: 11,
        minute: 50,
      },
    });
    const sections = [{
      class_mtg_info: [{
        meet_t: 'MoWe 11:00AM - 11:50AM',
      }],
    }];

    expect(getSectionsForDow('Mon', sections)).toEqual(sections);
  });

  it('filter unscheduled sections correctly', () => {
    const parseMeetingTimeSpy = jest.spyOn(calendarHelpers, 'parseMeetingTime');
    parseMeetingTimeSpy.mockReturnValue('TBA');
    const sections = [{
      class_mtg_info: [{
        meet_t: 'TBA',
      }],
    }];

    expect(getSectionsForDow('Mon', sections)).toEqual([]);
  });
});

describe('CalendarView', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledCalendarView sections={[]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
