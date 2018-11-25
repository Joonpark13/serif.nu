import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSection, styles } from './Section';

describe('Section', () => {
  describe('dynamic styles', () => {
    const hour = 10;
    const section = {
      schedule: [{
        dow: ['Mo'],
        start: {
          hour: 10,
          minute: 30,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      }],
    };

    expect(styles.paper.top({ hour, section })).toBe('50%');
  });

  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const testSection = { id: 12345, course: '101-1' };
    const wrapper = shallow(
      <UnstyledSection hour={10} section={testSection} classes={classes} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
