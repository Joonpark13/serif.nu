import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import * as calendarHelpers from './calendar-helpers';
import { getSectionsForHour, UnstyledDowColumn, styles } from './DowColumn';

describe('getSectionsForHour', () => {
  it('filters sections correctly given hour', () => {
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

    expect(getSectionsForHour(11, sections)).toEqual(sections);
  });
});

describe('DowColumn', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledDowColumn dow="Mon" sections={[]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
