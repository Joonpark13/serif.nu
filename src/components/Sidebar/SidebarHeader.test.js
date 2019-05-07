import { wrapperCreator } from 'util/testing';
import { UnstyledSidebarHeader, styles } from './SidebarHeader';

describe('SidebarHeader', () => {
  const defaultProps = {
    title: 'Title',
    back: () => {},
  };
  const getComponent = wrapperCreator(UnstyledSidebarHeader, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
