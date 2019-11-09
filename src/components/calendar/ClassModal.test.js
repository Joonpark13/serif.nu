import React from 'react';
import { shallow } from 'enzyme';
import * as notistack from 'notistack';
import { Button, DialogTitle } from '@material-ui/core';
import { mockUseDispatch, testSection } from 'util/testing';
import { removeSection } from 'actions';
import ClassModal from './ClassModal';

jest.mock('notistack');
jest.mock('react-redux');

describe('ClassModal', () => {
  const section = { ...testSection, color: '#58B947' };
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
        location: 'somewhere',
      },
    };
    const wrapper = shallow(
      <ClassModal {...defaultProps} associatedClass={associatedClass} />,
    );

    expect(wrapper.find(DialogTitle).at(0).prop('children'))
      .toEqual([`${associatedClass.type} - `, section.name]);
    expect(wrapper.find('div').at(1).get(0)).toMatchSnapshot();
  });

  it('closes the modal when clicked', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<ClassModal {...defaultProps} />);
    wrapper.find(Button).first().simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(removeSection(section.id, section.color));
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
