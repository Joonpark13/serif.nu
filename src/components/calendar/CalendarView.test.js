import React from 'react';
import { shallow } from 'enzyme';
import CalendarView from './CalendarView';

describe('CalendarView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CalendarView />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
