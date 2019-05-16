import { wrapperCreator } from 'util/testing';
import { UnstyledBugReportPage, styles } from './BugReportPage';

describe('BugReportPage', () => {
  const getWrapper = wrapperCreator(UnstyledBugReportPage, undefined, styles);

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
