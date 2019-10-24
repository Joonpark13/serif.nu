import React from 'react';
import { shallow } from 'enzyme';
import AppBody from './AppBody';

jest.mock('images/hero-image.jpg');

describe('AppBody', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AppBody />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
