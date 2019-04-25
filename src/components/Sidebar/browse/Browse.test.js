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

  it('renders courses correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="course" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders sections correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="section" />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders associated classes correctly', () => {
    const wrapper = shallow(<Browse currentBrowseLevel="associatedClass" />);

    expect(wrapper).toMatchSnapshot();
  });
});
