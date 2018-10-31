import React from 'react';
import { shallow } from 'enzyme';
import Search from './Search';

describe('SearchResults', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Search view="search" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders sectionSelection view correctly', () => {
    const wrapper = shallow(<Search view="sectionSelection" />);

    expect(wrapper).toMatchSnapshot();
  });
});
