import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { getSectionsForHour, UnstyledDowColumn, styles } from './DowColumn';

describe('getSectionsForHour', () => {
  it('filters sections correctly given hour', () => {
    const sections = [{
      schedule: [{
        dow: ['Mo', 'We'],
        start: {
          hour: 11,
          minute: 0,
        },
        end: {
          hour: 11,
          minute: 50,
        },
      }],
    }, {
      schedule: [{
        dow: ['Mo', 'We', 'Fr'],
        start: {
          hour: 13,
          minute: 0,
        },
        end: {
          hour: 13,
          minute: 50,
        },
      }],
    }];

    expect(getSectionsForHour(11, sections)).toEqual([sections[0]]);
  });
});

describe('DowColumn', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledDowColumn hour={10} dow="Mon" sections={[]} classes={classes} />);

    expect(wrapper).toMatchSnapshot();
  });
});
