import { wrapperCreator } from 'util/testing';
import { UnstyledAboutPage, styles } from './AboutPage';

jest.mock('images/hero-image.jpg');

describe('AboutPage', () => {
  const getWrapper = wrapperCreator(UnstyledAboutPage, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
