import React from 'react';
import { shallow } from 'enzyme';
import { Tabs } from '@material-ui/core';
import SidebarView from './SidebarView';

describe('SidebarView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SidebarView />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes tabs correctly', () => {
    const wrapper = shallow(<SidebarView />);

    wrapper.find(Tabs).props().onChange('onChange', 'browse');

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes to cart correctly', () => {
    const wrapper = shallow(<SidebarView />);

    wrapper.find(Tabs).props().onChange('onChange', 'cart');

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
