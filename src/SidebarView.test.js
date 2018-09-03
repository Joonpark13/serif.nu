import React from 'react';
import renderer from 'react-test-renderer';
import SidebarView from './SidebarView';

it('renders correctly', () => {
  const tree = renderer.create(<SidebarView />).toJSON();

  expect(tree).toMatchSnapshot();
});
