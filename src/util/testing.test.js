import React from 'react';
import { wrapperCreator } from './testing';

describe('Testing Utils', () => {
  describe('wrapperCreator', () => {
    it('creates a wrapper creator function', () => {
      const TestComponent = () => <div />;
      const wrapper = wrapperCreator(TestComponent);
      expect(wrapper().get(0)).toMatchSnapshot();
    });
  });
});
