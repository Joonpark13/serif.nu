import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledApp, styles } from './App';

describe('App', () => {
  it('should render correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledApp classes={classes} getSchools={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});
