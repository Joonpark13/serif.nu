import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('SearchResults', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Search />);

    expect(wrapper).toMatchSnapshot();
  });
});
