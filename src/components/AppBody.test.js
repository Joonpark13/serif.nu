import { wrapperCreator } from 'util/testing';
import { UnstyledAppBody, styles } from './AppBody';

jest.mock('images/hero-image.jpg');

describe('AppBody', () => {
  const getWrapper = wrapperCreator(UnstyledAppBody, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
