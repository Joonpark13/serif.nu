import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledClassModal, styles } from './ClassModal';

describe('ClassModal', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSection = { id: '12345', course: '101-1' };
    const wrapper = shallow(
      <UnstyledClassModal
        section={testSection}
        classes={classes}
        showDialog
        toggleDialog={() => {}}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
