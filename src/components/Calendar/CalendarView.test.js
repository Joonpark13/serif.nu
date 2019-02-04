import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledCalendarView, styles } from './CalendarView';

describe('CalendarView', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledCalendarView classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
