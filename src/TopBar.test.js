import React from 'react';
import renderer from 'react-test-renderer';
import TopBar from './TopBar';

it('renders correctly', () => {
  const tree = renderer.create(<TopBar />).toJSON();

  expect(tree).toMatchSnapshot();
});
