import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSection, styles } from './Section';
import * as calendarHelpers from './calendar-helpers';

describe('Section', () => {
  describe('dynamic styles', () => {
    const hour = 10;
    const dow = 'Mo';
    const schedule = {
      dow: [dow],
      start: {
        hour: 10,
        minute: 30,
      },
      end: {
        hour: 12,
        minute: 0,
      },
    };
    const color = 'some color';
    const section = { schedule: [schedule], color };

    beforeEach(() => {
      calendarHelpers.getScheduleObjGivenHourAndDow = jest.fn();
      calendarHelpers.getScheduleObjGivenHourAndDow.mockReturnValue(schedule);
    });

    it('correctly calculates section card placement', () => {
      expect(styles.paper.top({ hour, dow, section })).toBe('50%');
    });

    it('correctly calculates section card height', () => {
      expect(styles.paper.height({ hour, dow, section })).toBe('150%');
    });

    it('correctly grabs the section background color', () => {
      expect(styles.paper.backgroundColor({ section })).toBe(color);
    });
  });

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSection = { id: '12345', course: '101-1' };
    const wrapper = shallow(
      <UnstyledSection hour={10} dow="Mo" section={testSection} classes={classes} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
