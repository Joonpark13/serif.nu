import React from 'react';
import { shallow } from 'enzyme';
import * as timeUtils from 'util/time';
import { testSchedule, testSection } from 'util/testing';
import SectionSelection from './SectionSelection';
import SectionResult from './SectionResult';

describe('SectionSelection', () => {
  const defaultProps = {
    currentCourseName: 'EECS 101-0',
    sections: [{
      ...testSection,
      id: '1',
      schedules: [{ ...testSchedule, dow: ['Mo'] }],
    }, {
      ...testSection,
      id: '2',
      schedules: [{ ...testSchedule, dow: ['Tu'] }],
    }],
    scheduledSections: [],
    addSection: () => {},
    back: () => {},
  };
  const scheduledSectionsTestData = [{
    ...testSection,
    id: '1',
    schedules: [{ ...testSchedule, dow: ['Mo'] }],
  }];

  beforeEach(() => {
    timeUtils.getFormattedClassSchedule = jest.fn();
    timeUtils.getFormattedClassSchedule.mockReturnValue('schedule');
  });

  it('renders correctly', () => {
    const wrapper = shallow(<SectionSelection {...defaultProps} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('disables sections that are already scheduled', () => {
    const wrapper = shallow(
      <SectionSelection
        {...defaultProps}
        scheduledSections={scheduledSectionsTestData}
      />,
    );
    expect(
      wrapper
        .findWhere(
          section => (
            section.is(SectionResult) && section.key() === scheduledSectionsTestData[0].id
          ),
        )
        .prop('disabled'),
    ).toBe(true);
  });
});
