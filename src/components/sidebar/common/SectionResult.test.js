import React from 'react';
import { shallow } from 'enzyme';
import * as notistack from 'notistack';
import { ListItem, Typography } from '@material-ui/core';
import * as timeUtils from 'util/time';
import { mockUseDispatch, testSchedule, testSection } from 'util/testing';
import { sectionHover, sectionHoverOff } from 'actions';
import SectionResult from './SectionResult';

jest.mock('util/time');
jest.mock('notistack');

describe('SectionResult', () => {
  const formattedSchedule = 'MWF 10 - 12ish';
  timeUtils.getFormattedClassSchedule.mockReturnValue(formattedSchedule);
  const enqueueSnackbarMock = jest.fn();
  notistack.useSnackbar.mockReturnValue({ enqueueSnackbar: enqueueSnackbarMock });

  const defaultProps = {
    addSection: () => {},
    section: testSection,
  };
  const message = 'Class successfully added';

  it('renders correctly', () => {
    const wrapper = shallow(
      <SectionResult {...defaultProps} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders instructors correctly for multiple instructors', () => {
    const wrapper = shallow(
      <SectionResult {...defaultProps} section={{ ...testSection, instructors: ['Prof 1', 'Prof 2'] }} />,
    );

    expect(wrapper.find(Typography).at(4).prop('children')).toEqual(['Prof 1, ', 'Prof 2']);
  });

  it('adds section when clicked', () => {
    const addSectionMock = jest.fn();
    const wrapper = shallow(
      <SectionResult {...defaultProps} addSection={addSectionMock} />,
    );
    wrapper.find(ListItem).simulate('click');

    expect(addSectionMock).toHaveBeenCalledWith(testSection);
  });

  it('turns scheduled text to red if section is unscheduled', () => {
    timeUtils.getFormattedClassSchedule.mockReturnValue('TBA');
    timeUtils.isUnscheduled.mockReturnValue(true);
    const unscheduledSection = {
      id: '3',
      termId: '111111',
      schoolId: 'MEAS',
      subjectId: 'COMP_SCI',
      courseId: '101-1',
      name: '',
      sectionNumber: '21',
      topic: 'Section topic...',
      descriptions: [{ name: '', value: '' }],
      schedules: [testSchedule],
      instructors: ['Ian Horswill', 'Vincent St-Amour'],
    };
    const wrapper = shallow(
      <SectionResult {...defaultProps} section={unscheduledSection} />,
    );
    const colorProp = wrapper
      .findWhere(
        node => node.is(Typography) && node.prop('children') === 'TBA',
      )
      .prop('color');
    expect(colorProp).toBe('error');
  });

  it('dispatches sectionHover when hovered', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<SectionResult {...defaultProps} />);
    wrapper.find(ListItem).simulate('mouseEnter');

    expect(dispatchMock).toHaveBeenCalledWith(sectionHover(testSection));
  });

  it('dispatches sectionHoverOff on mouse leave', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<SectionResult {...defaultProps} />);
    wrapper.find(ListItem).simulate('mouseLeave');

    expect(dispatchMock).toHaveBeenCalledWith(sectionHoverOff());
  });

  it('pops up snackbar when clicked', () => {
    const wrapper = shallow(
      <SectionResult {...defaultProps} handleClick={enqueueSnackbarMock} />,
    );
    wrapper.find(ListItem).simulate('click');

    expect(enqueueSnackbarMock).toHaveBeenCalledWith(message, {
      variant: 'success',
    });
  });
});
