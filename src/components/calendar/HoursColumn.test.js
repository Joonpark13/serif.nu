import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { formatHour, UnstyledHoursColumn, styles } from './HoursColumn';

describe('formatHour', () => {
  it('returns 12am when given 0 or 24', () => {
    expect(formatHour(0)).toBe('12am');
    expect(formatHour(24)).toBe('12am');
  });

  it('returns correctly formatted hour when given an hour between 1 and 11', () => {
    expect(formatHour(7)).toBe('7am');
  });

  it('returns 12pm when given 12', () => {
    expect(formatHour(12)).toBe('12pm');
  });

  it('returns correctly formatted hour when given an hour between 13 and 23', () => {
    expect(formatHour(17)).toBe('5pm');
  });

  it('throws RangeError when given an invalid hour', () => {
    expect(() => { formatHour(25); }).toThrowError(RangeError);
  });
});

describe('HoursColumn', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledHoursColumn hours={[1, 2]} classes={classes} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
