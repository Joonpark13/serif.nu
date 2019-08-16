import React from 'react';
import { shallow } from 'enzyme';
import * as timeUtils from 'util/time';
import SectionSelection from './SectionSelection';
import SectionResult from './SectionResult';

describe('SectionSelection', () => {
  const defaultProps = {
    currentCourseName: 'EECS 101-0',
    sections: [{
      id: '1',
      sectionNumber: 20,
      schedules: [{
        location: 'Some building',
      }],
      instructors: ['Jason Hartline'],
    }, {
      id: '2',
      sectionNumber: 21,
      schedules: [{
        location: 'Some other building',
      }],
      instructors: ['Ian Horswill', 'Vincent St-Amour'],
    }],
    scheduledSections: [],
    addSection: () => {},
    back: () => {},
  };
  const scheduledSectionsTestData = [{
    id: '1',
    sectionNumber: 20,
    schedules: [{
      location: 'Some building',
    }],
    instructors: ['Jason Hartline'],
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
