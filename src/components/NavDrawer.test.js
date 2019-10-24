import React from 'react';
import { shallow } from 'enzyme';
import NavDrawer from './NavDrawer';

describe('NavDrawer', () => {
  const defaultProps = {
    isOpen: true,
    closeFunc: () => {},
  };

  it('should render correctly', () => {
    const wrapper = shallow(<NavDrawer {...defaultProps} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
