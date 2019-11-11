import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector } from 'util/testing';
import Custom from './Custom';

describe('Custom', () => {
  it('renders correctly', () => {
    mockUseSelector('custom');

    const wrapper = shallow(<Custom />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
