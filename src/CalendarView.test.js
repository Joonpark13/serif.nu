import React from 'react';
import renderer from 'react-test-renderer';
import CalendarView from './CalendarView';

it('renders correctly', () => {
  const tree = renderer.create(<CalendarView />).toJSON();

  expect(tree).toMatchSnapshot();
});
