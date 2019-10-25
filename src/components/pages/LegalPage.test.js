import { wrapperCreator } from 'util/testing';
import { UnstyledLegalPage, styles } from './LegalPage';

describe('LegalPage', () => {
  const getWrapper = wrapperCreator(UnstyledLegalPage, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
