import React from 'react';
import { shallow } from 'enzyme';
import AnnouncementDialog from './AnnouncementDialog';

describe('AnnouncementDialog', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AnnouncementDialog />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
