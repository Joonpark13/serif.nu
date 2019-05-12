import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledAppBody, styles } from './AppBody';

describe('AppBody', () => {
  it('should render correctly', () => {
    const classes = mockStyles(styles.calendar);
    const wrapper = shallow(<UnstyledAppBody classes={classes} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
