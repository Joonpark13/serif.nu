import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledTopBar, styles } from './TopBar';

describe('TopBar', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledTopBar classes={classes} menuAction={() => {}} />);

    expect(wrapper).toMatchSnapshot();
  });
});
