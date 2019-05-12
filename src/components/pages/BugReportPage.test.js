import React from 'react';
import { shallow } from 'enzyme';
import BugReportPage from './BugReportPage';

describe('BugReportPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BugReportPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
