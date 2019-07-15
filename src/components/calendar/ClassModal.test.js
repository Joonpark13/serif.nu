import React from 'react';
import { shallow } from 'enzyme';
import { Button, Typography } from '@material-ui/core';
import * as notistack from 'notistack';
import ClassModal from './ClassModal';

jest.mock('notistack');

describe('ClassModal', () => {
  const section = {
    id: '198732',
    name: 'Introduction to Something',
    sectionNumber: 20,
    topic: 'Section topic...',
    schedules: [{
      location: 'somewhere',
      dow: ['Mo'],
      start: {
        hour: 10,
        minute: 30,
      },
      end: {
        hour: 12,
        minute: 0,
      },
    }],
    instructors: ['A prof'],
    color: '#58B947',
    descriptions: [{ name: '', value: '' }],
  };
  const defaultProps = {
    section,
    showDialog: true,
    toggleDialog: () => {},
    removeSection: () => {},
  };
  const enqueueSnackbarMock = jest.fn();
  notistack.useSnackbar.mockReturnValue({ enqueueSnackbar: enqueueSnackbarMock });
  const message = 'Class successfully removed';

  it('renders correctly', () => {
    const wrapper = shallow(
      <ClassModal {...defaultProps} />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly for associated class', () => {
    const associatedClass = {
      type: 'LAB',
      schedule: {
        dow: ['Mo'],
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 12,
          minute: 0,
        },
      },
    };
    const wrapper = shallow(
      <ClassModal {...defaultProps} associatedClass={associatedClass} />,
    );

    expect(wrapper.find(Typography).at(0).prop('children'))
      .toEqual([`${associatedClass.type} - `, section.name]);
    expect(wrapper.find('div').at(1).get(0)).toMatchSnapshot();
  });

  it('closes the modal when clicked', () => {
    const removeSectionMock = jest.fn();
    const wrapper = shallow(
      <ClassModal {...defaultProps} removeSection={removeSectionMock} />,
    );
    wrapper.find(Button).first().simulate('click');

    expect(removeSectionMock).toHaveBeenCalledWith(section.id, section.color);
  });


  it('pops up snackbar when clicked', () => {
    const wrapper = shallow(
      <ClassModal {...defaultProps} handleClick={enqueueSnackbarMock} />,
    );
    wrapper.find(Button).first().simulate('click');

    expect(enqueueSnackbarMock).toHaveBeenCalledWith(message, {
      variant: 'success',
    });
  });
});
