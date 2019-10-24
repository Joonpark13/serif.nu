import React from 'react';
import { shallow } from 'enzyme';
import { ListItem, Typography } from '@material-ui/core';
import * as timeUtils from 'util/time';
import AssociatedClassesSelection from './AssociatedClassesSelection';

jest.mock('util/time');

describe('AssociatedClassesSelection', () => {
  const associatedClass = {
    schedule: {
      location: 'somewhere',
      start: {
        hour: 10,
        minute: 30,
      },
      end: {
        hour: 15,
        minute: 0,
      },
      dow: ['Mo'],
    },
  };
  const defaultProps = {
    currentCourseName: 'Introduction to Something',
    currentSectionNumber: '21',
    associatedClasses: [associatedClass],
    back: () => {},
    addSectionWithAssociatedClass: () => {},
    associatedClassHover: () => {},
    associatedClassHoverOff: () => {},
  };

  const formattedSchedule = 'MWF 10 - 12ish';
  timeUtils.getFormattedClassSchedule.mockReturnValue(formattedSchedule);

  it('renders correctly', () => {
    const wrapper = shallow(<AssociatedClassesSelection {...defaultProps} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('adds section with associated class when clicked', () => {
    const addSectionWithAssociatedClassMock = jest.fn();
    const wrapper = shallow(
      <AssociatedClassesSelection
        {...defaultProps}
        addSectionWithAssociatedClass={addSectionWithAssociatedClassMock}
      />,
    );
    wrapper.find(ListItem).simulate('click');

    expect(addSectionWithAssociatedClassMock).toHaveBeenCalledWith(associatedClass);
  });

  it('calls associatedClassHover when clicked', () => {
    const associatedClassHoverMock = jest.fn();
    const wrapper = shallow(
      <AssociatedClassesSelection
        {...defaultProps}
        associatedClassHover={associatedClassHoverMock}
      />,
    );

    wrapper.find(ListItem).simulate('mouseEnter');

    expect(associatedClassHoverMock).toHaveBeenCalledWith(associatedClass);
  });

  it('turns scheduled text to red and disables associatedclass if unscheduled', () => {
    timeUtils.isUnscheduled.mockReturnValue(true);
    const wrapper = shallow(
      <AssociatedClassesSelection
        {...defaultProps}
        associatedClasses={[{
          type: 'LAB',
          schedule: {
            dow: 'TBA',
            start: 'TBA',
            end: 'TBA',
          },
        }]}
      />,
    );

    expect(wrapper.find(ListItem).prop('disabled')).toBe(true);
    expect(wrapper.find(Typography).at(1).prop('color')).toBe('error');
  });
});
