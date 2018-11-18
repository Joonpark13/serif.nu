import React from 'react';
import { shallow } from 'enzyme';
import ReportPage from './ReportPage';

describe('ReportPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ReportPage />);

    expect(wrapper).toMatchSnapshot();
  });
});
