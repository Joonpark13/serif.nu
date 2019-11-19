import React from 'react';
import { shallow } from 'enzyme';
import FeatureRequestPage from './FeatureRequestPage';

describe('FeatureRequestPage', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<FeatureRequestPage />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
