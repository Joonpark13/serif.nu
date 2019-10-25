import { wrapperCreator } from 'util/testing';
import { UnstyledAboutPage, styles } from './AboutPage';

jest.mock('images/hero-image.jpg');
jest.mock('images/amy.jpg');
jest.mock('images/helen.jpg');
jest.mock('images/facebook-logo.png');
jest.mock('images/joon.jpeg');
jest.mock('images/julia.jpg');
jest.mock('images/kevin.jpg');
jest.mock('images/madison.jpg');
jest.mock('images/surprised_student.svg');

describe('AboutPage', () => {
  const getWrapper = wrapperCreator(UnstyledAboutPage, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
