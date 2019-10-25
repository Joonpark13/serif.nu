import { Button } from '@material-ui/core';
import { wrapperCreator } from 'util/testing';
import { UnstyledBugReportPage, styles } from './BugReportPage';

describe('BugReportPage', () => {
  const getWrapper = wrapperCreator(UnstyledBugReportPage, undefined, styles);

  it('should render correctly before user acknowledgement', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should render correctly after user acknowledgement', () => {
    const wrapper = getWrapper();

    wrapper.find(Button).simulate('click');

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
