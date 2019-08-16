import React from 'react';
import { shallow } from 'enzyme';
import DowColumn from './DowColumn';

describe('DowColumn', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<DowColumn dow="Mon" />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
