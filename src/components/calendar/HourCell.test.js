import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector } from 'util/testing';
import * as selectors from 'selectors';
import HourCell from './HourCell';
import CalendarSection from './CalendarSection';
import AssociatedClass from './AssociatedClass';

jest.mock('selectors');

describe('HourCell', () => {
  const dow = ['Mo'];
  const schedule = {
    dow,
    start: {
      hour: 10,
      minute: 30,
    },
    end: {
      hour: 12,
      minute: 0,
    },
    location: '',
  };
  const name = 'Seminar';
  const description = { name: '', value: '' };
  const testAssociatedClass = {
    sectionId: '12345',
    schedule: {
      ...schedule,
      dow: ['Tu'],
    },
    type: 'DIS',
  };
  const testSection = {
    id: '12345',
    termId: '111111',
    schoolId: 'MEAS',
    subjectId: 'COMP_SCI',
    courseId: '101-1',
    name,
    sectionNumber: '1',
    topic: '',
    descriptions: [description],
    instructors: [''],
    schedules: [schedule],
  };
  const testSections = [testSection];
  const allSections = [testSection];
  const allSectionPreviews = [];
  const associatedClasses = [{
    ...testAssociatedClass,
    event: {},
  }];

  let useSelectorMock;

  beforeEach(() => {
    useSelectorMock = mockUseSelector(
      testSections, associatedClasses, undefined, undefined, allSections, allSectionPreviews,
    );
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('calls sectionsForHourSelector correctly', () => {
    shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[0][0](state);
    expect(selectors.sectionsForHourSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls associatedClassesForHourSelector correctly', () => {
    shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[1][0](state);
    expect(selectors.associatedClassesForHourSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls sectionPreviewSelector correctly', () => {
    shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[2][0](state);
    expect(selectors.sectionPreviewSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls associatedClassPreviewSelector correctly', () => {
    shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[3][0](state);
    expect(selectors.associatedClassPreviewSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('renders section previews', () => {
    const sectionPreview = testSection;

    mockUseSelector(
      testSections, associatedClasses, sectionPreview, undefined, allSections, [sectionPreview],
    );

    const wrapper = shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    expect(wrapper.find(CalendarSection).exists()).toBe(true);
  });

  it('renders associated class previews', () => {
    const associatedClassPreview = testAssociatedClass;

    mockUseSelector(
      testSections,
      associatedClasses,
      undefined,
      associatedClassPreview,
      allSections,
      [testSection],
    );

    const wrapper = shallow(
      <HourCell
        hour={10}
        dow="Mo"
      />,
    );

    expect(wrapper.find(AssociatedClass).exists()).toBe(true);
  });
});
