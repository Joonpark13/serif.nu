import React from 'react';
import { shallow } from 'enzyme';
import { mockUseSelector, testSchedule, testSection } from 'util/testing';
import * as notistack from 'notistack';
import GoogleCalendarButton from './GoogleCalendarButton';

jest.mock('notistack');

describe('GoogleCalendarButton', () => {
  const enqueueSnackbarMock = jest.fn();
  notistack.useSnackbar.mockReturnValue({ enqueueSnackbar: enqueueSnackbarMock });
  const dow = 'Mo';
  const event = { ...testSchedule, dow };
  const testSectionWithEvent = { ...testSection, event, topic: '' };
  const courses = [testSectionWithEvent];
  it('renders correctly', () => {
    global.GCAL_CONFIG = {
      GCAL_CLIENT_ID: '',
      GCAL_API_KEY: '',
    };
    mockUseSelector(courses);
    const wrapper = shallow(<GoogleCalendarButton menuAction={() => {}} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});
