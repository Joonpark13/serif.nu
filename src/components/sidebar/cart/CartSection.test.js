import React from 'react';
import { shallow } from 'enzyme';
import * as timeUtils from 'util/time';
import Section from 'components/common/Section';
import ClassModal from 'components/calendar/ClassModal';
import CartSection, { styles } from './CartSection';

describe('CartSection', () => {
  beforeEach(() => {
    timeUtils.getFormattedClassSchedule = jest.fn();
    timeUtils.getFormattedClassSchedule.mockReturnValue('schedules');
  });

  describe('dynamic styles', () => {
    const color = 'some color';
    const section = { color };
    it('correctly grabs the section background color', () => {
      expect(styles.paper.backgroundColor({ section })).toBe(color);
    });
  });

  it('renders correctly', () => {
    const testSection = { schedules: [{}], subjectId: 'EECS', courseId: '111-0' };
    const wrapper = shallow(
      <CartSection section={testSection} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('formats left header content correctly when multiple schedules present', () => {
    const testSection = { schedules: [{}, {}], subjectId: 'EECS', courseId: '111-0' };
    const wrapper = shallow(
      <CartSection section={testSection} />,
    );

    expect(wrapper.find(Section).prop('leftHeaderContent')).toBe('schedules, schedules');
  });

  it('opens modal on click', () => {
    const testSection = { schedules: [{}], subjectId: 'EECS', courseId: '111-0' };
    const wrapper = shallow(
      <CartSection section={testSection} />,
    );

    wrapper.find(Section).simulate('click');

    expect(wrapper.find(ClassModal).prop('showDialog')).toBe(true);
  });
});
