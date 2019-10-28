import React from 'react';
import { shallow } from 'enzyme';
import GoogleCalendarButton from './GoogleCalendarButton';

describe('GoogleCalendarButton', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GoogleCalendarButton menuAction={() => {}} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
