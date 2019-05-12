import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AboutPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
