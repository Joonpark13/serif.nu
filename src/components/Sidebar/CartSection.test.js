import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import * as timeUtils from 'util/time';
import Section from 'components/common/Section';
import { UnstyledCartSection, styles } from './CartSection';

describe('CartSection', () => {
  beforeEach(() => {
    timeUtils.getFormattedClassSchedule = jest.fn();
    timeUtils.getFormattedClassSchedule.mockReturnValue('schedule');
  });

  describe('dynamic styles', () => {
    const color = 'some color';
    const section = { color };
    it('correctly grabs the section background color', () => {
      expect(styles.paper.backgroundColor({ section })).toBe(color);
    });
  });

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSection = { schedule: [{}], subjectId: 'EECS', courseId: '111-0' };
    const wrapper = shallow(
      <UnstyledCartSection section={testSection} classes={classes} />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('formats left header content correctly when multiple schedules present', () => {
    const classes = mockStyles(styles);
    const testSection = { schedule: [{}, {}], subjectId: 'EECS', courseId: '111-0' };
    const wrapper = shallow(
      <UnstyledCartSection section={testSection} classes={classes} />,
    );

    expect(wrapper.find(Section).prop('leftHeaderContent')).toBe('schedule, schedule');
  });
});
