import React from 'react';
import { shallow } from 'enzyme';
import FAQPage from './FAQPage';

describe('FAQPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FAQPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
