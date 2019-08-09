import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector } from 'util/testing';
import { Button } from '@material-ui/core';
import Cart from './Cart';
import CartDialog from './CartDialog';

describe('Cart', () => {
  beforeEach(() => {
    mockUseSelector([]);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly with one section', () => {
    mockUseSelector([{ id: '12345' }]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly with multiple sections with the same id', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('opens the modal when clicked', () => {
    mockUseSelector([{ id: '123' }, { id: '123' }]);

    const wrapper = shallow(<Cart />);
    wrapper.find(Button).first().simulate('click');

    expect(wrapper.find(CartDialog)).toHaveLength(1);
  });
});
