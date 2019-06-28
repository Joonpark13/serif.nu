import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector } from 'util/testing';
import Search from './Search';

describe('Search', () => {
  it('renders correctly', () => {
    mockUseSelector('search');

    const wrapper = shallow(<Search />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders sectionSelection view correctly', () => {
    mockUseSelector('sectionSelection');

    const wrapper = shallow(<Search />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders associatedClassesSelection view correctly', () => {
    mockUseSelector('associatedClassesSelection');

    const wrapper = shallow(<Search />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
