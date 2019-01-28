import React from 'react';
import { shallow } from 'enzyme';
import Cart from './Cart';

describe('TopBar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Cart />);

    expect(wrapper).toMatchSnapshot();
  });
});
