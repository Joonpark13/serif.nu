import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector, testSection } from 'util/testing';
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
    mockUseSelector([testSection]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly with multiple sections with the same id', () => {
    mockUseSelector([testSection, testSection]);

    const wrapper = shallow(<Cart />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('opens the modal when clicked', () => {
    mockUseSelector([testSection, testSection]);

    const wrapper = shallow(<Cart />);
    wrapper.find(Button).first().simulate('click');

    expect(wrapper.find(CartDialog)).toHaveLength(1);
  });
});
