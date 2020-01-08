import React from 'react';
import { shallow } from 'enzyme';
import MyApp from './MyApp';

describe('MyApp', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<MyApp />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
