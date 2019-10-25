import { wrapperCreator } from 'util/testing';
import { UnstyledPageTitle, styles } from './PageTitle';

describe('PageTitle', () => {
  const defaultProps = {
    title: 'Title',
  };
  const getComponent = wrapperCreator(UnstyledPageTitle, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
