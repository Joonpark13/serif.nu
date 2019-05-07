import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { styles } from '../App';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('should render correctly', () => {
    const classes = mockStyles(styles.calendar);
    const wrapper = shallow(<HomePage classes={classes} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
