import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSection, styles } from './Section';
import * as calendarHelpers from './calendar-helpers';

describe('Section', () => {
  describe('dynamic styles', () => {
    it('correctly calculates section card height', () => {
      const hour = 10;
      const dow = 'Mo';
      const schedule = {
        dow: [dow],
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      };
      const section = { schedule: [schedule] };

      calendarHelpers.getScheduleObjGivenHourAndDow = jest.fn();
      calendarHelpers.getScheduleObjGivenHourAndDow.mockReturnValue(schedule);

      expect(styles.paper.top({ hour, dow, section })).toBe('50%');
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
