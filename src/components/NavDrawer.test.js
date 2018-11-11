import React from 'react';
import { shallow } from 'enzyme';
import NavDrawer from './NavDrawer';

describe('NavDrawer', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NavDrawer isOpen closeFunc={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});
