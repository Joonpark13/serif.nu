/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import * as useSelector from './use-selector';

jest.mock('./use-selector');

// Helper function that returns a function which creates enzyme wrappers with default props
export function wrapperCreator(Component, defaultProps = {}) {
  let classes;
  return props => shallow(<Component classes={classes} {...defaultProps} {...props} />);
}

/* istanbul ignore next */
export function mockUseSelector(...args) {
  useSelector.default.mockReset();
  let callCounter = 0;
  useSelector.default.mockImplementation(() => {
    const mockValue = args[callCounter % args.length];
    callCounter += 1;
    return mockValue;
  });

  return useSelector.default;
}

/* istanbul ignore next */
export function mockUseDispatch() {
  const dispatchSpy = jest.fn();
  reactRedux.useDispatch.mockReturnValue(dispatchSpy);
  return dispatchSpy;
}
