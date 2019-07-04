import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from './NotFoundPage';

describe('FAQPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <NotFoundPage />,
    );

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
