import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector, mockUseDispatch } from 'util/testing';
import { Button } from '@material-ui/core';
import { removeAllClasses } from 'actions';
import CartDialog from './CartDialog';


describe('CartDialog', () => {
  beforeEach(() => {
    mockUseSelector([]);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <CartDialog />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('removes all classes when clicked on "remove"', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);

    const dispatchMock = mockUseDispatch();
    const wrapper = shallow(<CartDialog />);
    wrapper.find(Button).first().simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(removeAllClasses());
  });

  it('closes the modal when clicked on "cancel"', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);

    const wrapper = shallow(<CartDialog />);
    wrapper.find(Button).at(1).simulate('click');
    expect(wrapper.find(CartDialog)).toHaveLength(0);
  });
});
