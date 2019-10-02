import React from 'react';
import { shallow } from 'enzyme';
import Section from 'components/common/Section';
import ClassModal from './ClassModal';
import CalendarSection, { styles, MAX_WIDTH_PERCENT } from './CalendarSection';

describe('CalendarSection', () => {
  const dow = 'Mo';
  const event = {
    dow,
    start: {
      hour: 10,
      minute: 30,
    },
    end: {
      hour: 12,
      minute: 0,
    },
  };
  const name = 'Seminar';
  const topic = 'Propaganda';

  const testSection = { id: '12345', course: '101-1', event, name, topic: '' };
  const testSectionWithTopic = { id: '12345', course: '101-1', event, name, topic };

  describe('dynamic styles', () => {
    const hour = 10;
    const color = 'some color';
    const section = { event, color, column: 0, columnWidth: 1 };

    it('correctly calculates section card placement', () => {
      expect(styles.paper.top({ hour, dow, section })).toBe('50%');
    });

    it('correctly calculates section card height', () => {
      expect(styles.paper.height({ hour, dow, section })).toBe('150%');
    });

    it('correctly grabs the section background color', () => {
      expect(styles.paper.backgroundColor({ section })).toBe(color);
    });

    it('correctly calculates left offset', () => {
      expect(styles.paper.left({ section })).toBe('0%');
    });

    it('correctly calculates width', () => {
      expect(styles.paper.width({ section })).toBe(`${MAX_WIDTH_PERCENT}%`);
    });

    it('correctly sets zIndex to 1 when class is not preview', () => {
      expect(styles.paper.zIndex({ isPreview: false })).toBe(1);
    });

    it('correctly sets zIndex to 2 when class is preview', () => {
      expect(styles.paper.zIndex({ isPreview: true })).toBe(2);
    });

    it('correctly sets cursor to pointer when class is not preview', () => {
      expect(styles.paper.cursor({ isPreview: false })).toBe('pointer');
    });

    it('correctly sets cursor to default when class is preview', () => {
      expect(styles.paper.cursor({ isPreview: true })).toBe('default');
    });
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <CalendarSection section={testSection} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders modal correctly', () => {
    const wrapper = shallow(
      <CalendarSection section={testSection} />,
    );

    wrapper.find(Section).simulate('click');

    expect(wrapper.find(ClassModal).prop('showDialog')).toBe(true);
  });

  it('does nothing as a preview section when clicked', () => {
    const wrapper = shallow(
      <CalendarSection section={testSection} isPreview />,
    );

    wrapper.find(Section).simulate('click');

    expect(wrapper.find(ClassModal).prop('showDialog')).toBe(false);
  });

  it('shows topic as section title if it exists', () => {
    const wrapper = shallow(
      <CalendarSection section={testSectionWithTopic} />,
    );
    expect(wrapper.find(Section).prop('sectionName')).toBe(topic);
  });
});
