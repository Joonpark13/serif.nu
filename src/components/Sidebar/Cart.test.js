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
    const wrapper = shallow(<UnstyledCart sections={[{ id: '12345' }]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with multiple sections with the same id', () => {
    const classes = mockStyles(styles);
    const sections = [{ id: '123' }, { id: '123' }];
    const wrapper = shallow(<UnstyledCart sections={sections} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
