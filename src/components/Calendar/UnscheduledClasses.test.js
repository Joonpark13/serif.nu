import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledUnscheduledClasses, styles } from './UnscheduledClasses';

describe('UnscheduledClasses', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledUnscheduledClasses classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
