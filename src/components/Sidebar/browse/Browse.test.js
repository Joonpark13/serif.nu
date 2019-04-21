import React from 'react';
import { shallow } from 'enzyme';
import Browse from './Browse';

describe('Browse', () => {
  it('renders schools correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="school" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders subjects correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="subject" />);

    expect(wrapper).toMatchSnapshot();
  });
});
