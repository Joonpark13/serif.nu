import React from 'react';
import { shallow } from 'enzyme';
import AboutPage from './AboutPage';

jest.mock('images/hero-image.jpg');
jest.mock('images/alberta.jpg');
jest.mock('images/helen.jpg');
jest.mock('images/facebook-logo.png');
jest.mock('images/joon.jpeg');
jest.mock('images/julia.jpg');
jest.mock('images/kevin.jpg');
jest.mock('images/madison.jpg');
jest.mock('images/surprised_student.svg');

describe('AboutPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AboutPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
