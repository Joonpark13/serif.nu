import { wrapperCreator } from 'util/testing';
import { UnstyledFAQPage, styles } from './FAQPage';

describe('FAQPage', () => {
  const getWrapper = wrapperCreator(UnstyledFAQPage, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
