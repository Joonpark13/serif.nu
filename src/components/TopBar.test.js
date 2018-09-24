import React from 'react';
import { shallow } from 'enzyme';
import { UnstyledTopBar, styles } from './TopBar';
import { mockStyles } from '../util/testing';

describe('TopBar', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledTopBar classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
