import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { getSectionsForDow, UnstyledCalendarView, styles } from './CalendarView';

describe('getSectionsForDow', () => {
  it('filters sections correctly given a dow', () => {
    const sections = [{
      schedule: [{
        dow: ['Mo', 'We'],
        start: {
          hour: 11,
          minute: 0,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      }],
    }, {
      schedule: [{
        dow: ['We', 'Fr'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      }],
    }];

    expect(getSectionsForDow('Mon', sections)).toEqual([sections[0]]);
  });

  it('filters unscheduled sections correctly', () => {
    const sections = [{
      schedule: ['TBA'],
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
