import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledDowColumn, styles } from './DowColumn';

describe('DowColumn', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledDowColumn dow="Mon" classes={classes} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
