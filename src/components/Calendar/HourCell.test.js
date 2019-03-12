import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledHourCell, styles } from './HourCell';

describe('HourCell', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSections = [{ id: 12345 }];
    const allSections = [{ id: 12345 }];
    const associatedClasses = [{ event: {} }];
    const wrapper = shallow(
      <UnstyledHourCell
        hour={10}
        dow="Mo"
        sections={testSections}
        associatedClasses={associatedClasses}
        allSections={allSections}
        classes={classes}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
