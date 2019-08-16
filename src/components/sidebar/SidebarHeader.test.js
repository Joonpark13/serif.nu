import React from 'react';
import { shallow } from 'enzyme';
import SidebarHeader from './SidebarHeader';

describe('SidebarHeader', () => {
  const defaultProps = {
    title: 'Title',
    back: () => {},
  };

  it('renders correctly', () => {
    const wrapper = shallow(<SidebarHeader {...defaultProps} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
