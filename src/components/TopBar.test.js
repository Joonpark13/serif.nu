import React from 'react';
import { shallow } from 'enzyme';
import TopBar from './TopBar';

describe('TopBar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<TopBar menuAction={() => {}} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
