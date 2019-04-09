import React from 'react';
import { shallow } from 'enzyme';
import Browse from './Browse';

describe('Browse', () => {
  it('renders schools correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="schools" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders subjects correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="subjects" />);

    expect(wrapper).toMatchSnapshot();
  });
});
