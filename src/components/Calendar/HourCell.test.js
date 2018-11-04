import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledHourCell, styles } from './HourCell';

describe('HourCell', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSections = [{ id: 12345 }];
    const wrapper = shallow(<UnstyledHourCell sections={testSections} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
