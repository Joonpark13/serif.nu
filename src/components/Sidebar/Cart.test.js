import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledCart, styles } from './Cart';

describe('Cart', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledCart sections={[]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('renders correctly with one section', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledCart sections={[{}]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
