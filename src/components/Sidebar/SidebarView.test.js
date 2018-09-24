import React from 'react';
import { shallow } from 'enzyme';
import SidebarView from './SidebarView';

describe('SearchResults', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SidebarView />);

    expect(wrapper).toMatchSnapshot();
  });
});
