import React from 'react';
import { mockStyles, wrapperCreator } from './testing';

describe('Testing Utils', () => {
  describe('mockStyles', () => {
    it('returns a object with each style property as empty strings', () => {
      const style = {
        icon: {
          color: 'white',
        },
        title: {
          marginBotton: 2,
        },
      };

      expect(mockStyles(style)).toEqual({ icon: '', title: '' });
    });
  });

  describe('wrapperCreator', () => {
    it('creates a wrapper creator function', () => {
      const TestComponent = () => <div />;
      const wrapper = wrapperCreator(TestComponent);
      expect(wrapper()).toMatchSnapshot();
    });
  });
});
