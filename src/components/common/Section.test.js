import React from 'react';
import { shallow } from 'enzyme';
import Section from './Section';

describe('Section', () => {
  const classes = {
    paper: '',
    container: '',
    header: '',
    text: '',
    name: '',
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <Section
        classes={classes}
        leftHeaderContent="Left"
        rightHeaderContent="Right"
        sectionName="Intro to Whatever"
      />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should verify onClick as a default prop', () => {
    expect(Section.defaultProps.onClick()).not.toBeDefined();
  });
});
