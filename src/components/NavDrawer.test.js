import { wrapperCreator } from 'util/testing';
import { UnstyledNavDrawer, styles } from './NavDrawer';

describe('NavDrawer', () => {
  const defaultProps = {
    isOpen: true,
    closeFunc: () => {},
  };
  const getWrapper = wrapperCreator(UnstyledNavDrawer, defaultProps, styles);
  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
