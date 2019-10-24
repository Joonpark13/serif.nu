import React from 'react';
import { shallow } from 'enzyme';
import ContactPage from './ContactPage';

jest.mock('images/facebook-logo.png');

describe('ContactPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ContactPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
