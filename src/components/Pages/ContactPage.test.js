import React from 'react';
import { shallow } from 'enzyme';
import ContactPage from './ContactPage';

describe('ContactPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ContactPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
