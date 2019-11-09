import React from 'react';
import { shallow } from 'enzyme';
import * as timeUtils from 'util/time';
import { testSchedule, testSection } from 'util/testing';
import Section from 'components/common/Section';
import ClassModal from 'components/calendar/ClassModal';
import CartSection, { styles } from './CartSection';

describe('CartSection', () => {
  const testSectionWithMultipleSchedules = {
    ...testSection,
    schedules: [testSchedule, testSchedule],
  };

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
    const wrapper = shallow(
      <CartSection section={testSection} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('formats left header content correctly when multiple schedules present', () => {
    const wrapper = shallow(
      <CartSection section={testSectionWithMultipleSchedules} />,
    );

    expect(wrapper.find(Section).prop('leftHeaderContent')).toBe('schedules, schedules');
  });

  it('opens modal on click', () => {
    const wrapper = shallow(
      <CartSection section={testSection} />,
    );

    wrapper.find(Section).simulate('click');

    expect(wrapper.find(ClassModal).prop('showDialog')).toBe(true);
  });
});
