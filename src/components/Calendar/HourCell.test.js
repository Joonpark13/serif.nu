import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledHourCell, styles } from './HourCell';
import CalendarSection from './CalendarSection';
import AssociatedClass from './AssociatedClass';

describe('HourCell', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSections = [{ id: '12345' }];
    const allSections = [{ id: '12345' }];
    const allSectionPreviews = [];
    const associatedClasses = [{ event: {} }];
    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        sections={testSections}
        associatedClasses={associatedClasses}
        allSections={allSections}
        allSectionPreviews={allSectionPreviews}
        classes={classes}
      />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders section previews', () => {
    const classes = mockStyles(styles);
    const sectionPreview = { id: '12345' };
    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        sections={[]}
        sectionPreview={sectionPreview}
        associatedClasses={[]}
        allSections={[]}
        allSectionPreviews={[sectionPreview]}
        classes={classes}
      />,
    );

    expect(wrapper.find(CalendarSection).exists()).toBe(true);
  });

  it('renders associated class previews', () => {
    const classes = mockStyles(styles);
    const associatedClassPreview = { type: 'LAB' };
    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        sections={[]}
        associatedClasses={[]}
        associatedClassPreview={associatedClassPreview}
        allSections={[]}
        allSectionPreviews={[{ id: '12345' }]}
        classes={classes}
      />,
    );

    expect(wrapper.find(AssociatedClass).exists()).toBe(true);
  });
});
