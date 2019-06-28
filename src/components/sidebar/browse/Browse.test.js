import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector } from 'util/testing';
import Browse from './Browse';

describe('Browse', () => {
  beforeEach(() => {
    mockUseSelector('school');
  });

  it('renders schools correctly', () => {
    const wrapper = shallow(<Browse />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders subjects correctly', () => {
    mockUseSelector('subject');
    const wrapper = shallow(<Browse />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders courses correctly', () => {
    mockUseSelector('course');
    const wrapper = shallow(<Browse />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders sections correctly', () => {
    mockUseSelector('section');
    const wrapper = shallow(<Browse />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders associated classes correctly', () => {
    mockUseSelector('associatedClass');
    const wrapper = shallow(<Browse />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
