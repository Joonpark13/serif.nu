import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledClassesView, styles } from './ClassesView';

describe('ClassesView', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledClassesView
      classes={classes}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('changes tabs correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledClassesView
      classes={classes}
    />);
    wrapper.instance().handleChange('onChange', 'unscheduled');

    expect(wrapper).toMatchSnapshot();
  });
});
