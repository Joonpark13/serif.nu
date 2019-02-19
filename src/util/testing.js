/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';

// Helper function used to inject mock styles into a styled component for testing
export function mockStyles(style) {
  const mockedClasses = {};

  Object.keys(style).forEach((property) => {
    mockedClasses[property] = '';
  });

  return mockedClasses;
}

// Helper function that returns a function which creates enzyme wrappers with default props
export function wrapperCreator(Component, defaultProps = {}, styles = undefined) {
  let classes;
  if (styles) {
    classes = mockStyles(styles);
  }
  return props => shallow(<Component classes={classes} {...defaultProps} {...props} />);
}
