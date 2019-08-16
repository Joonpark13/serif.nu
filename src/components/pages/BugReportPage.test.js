import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import BugReportPage from './BugReportPage';

describe('BugReportPage', () => {
  it('should render correctly before user acknowledgement', () => {
    const wrapper = shallow(<BugReportPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should render correctly after user acknowledgement', () => {
    const wrapper = shallow(<BugReportPage />);

    wrapper.find(Button).simulate('click');

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
