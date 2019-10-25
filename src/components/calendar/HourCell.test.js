import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles, mockUseSelector } from 'util/testing';
import * as selectors from 'selectors';
import { UnstyledHourCell, styles } from './HourCell';
import CalendarSection from './CalendarSection';
import AssociatedClass from './AssociatedClass';

jest.mock('selectors');

describe('HourCell', () => {
  const testSections = [{ id: '12345' }];
  const allSections = [{ id: '12345' }];
  const allSectionPreviews = [];
  const associatedClasses = [{ event: {} }];

  let useSelectorMock;

  beforeEach(() => {
    useSelectorMock = mockUseSelector(
      testSections, associatedClasses, undefined, undefined, allSections, allSectionPreviews,
    );
  });

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('calls sectionsForHourSelector correctly', () => {
    const classes = mockStyles(styles);
    shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[0][0](state);
    expect(selectors.sectionsForHourSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls associatedClassesForHourSelector correctly', () => {
    const classes = mockStyles(styles);
    shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[1][0](state);
    expect(selectors.associatedClassesForHourSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls sectionPreviewSelector correctly', () => {
    const classes = mockStyles(styles);
    shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[2][0](state);
    expect(selectors.sectionPreviewSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('calls associatedClassPreviewSelector correctly', () => {
    const classes = mockStyles(styles);
    shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    const state = {};
    useSelectorMock.mock.calls[3][0](state);
    expect(selectors.associatedClassPreviewSelector).toHaveBeenCalledWith(state, 10, 'Mo');
  });

  it('renders section previews', () => {
    const classes = mockStyles(styles);
    const sectionPreview = { id: '12345' };

    mockUseSelector(
      testSections, associatedClasses, sectionPreview, undefined, allSections, [sectionPreview],
    );

    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    expect(wrapper.find(CalendarSection).exists()).toBe(true);
  });

  it('renders associated class previews', () => {
    const classes = mockStyles(styles);
    const associatedClassPreview = { type: 'LAB' };

    mockUseSelector(
      testSections, associatedClasses, undefined, associatedClassPreview, allSections, [{ id: '12345' }],
    );

    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        classes={classes}
      />,
    );

    expect(wrapper.find(AssociatedClass).exists()).toBe(true);
  });
});
