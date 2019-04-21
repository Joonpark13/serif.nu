import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledSectionSelection, styles } from './SectionSelection';
import SectionResultContainer from './SectionResultContainer';

describe('SectionSelection', () => {
  const defaultProps = {
    currentCourseName: 'EECS 101-0',
    sections: [{
      id: '1',
      sectionNumber: 20,
      schedule: [{
        location: 'Some building',
      }],
      instructors: ['Jason Hartline'],
    }, {
      id: '2',
      sectionNumber: 21,
      schedule: [{
        location: 'Some other building',
      }],
      instructors: ['Ian Horswill', 'Vincent St-Amour'],
    }],
    scheduledSections: [],
    back: () => {},
  };
  const scheduledSectionsTestData = [{
    id: '1',
    sectionNumber: 20,
    schedule: [{
      location: 'Some building',
    }],
    instructors: ['Jason Hartline'],
  }];
  const getComponent = wrapperCreator(UnstyledSectionSelection, defaultProps, styles);

  beforeEach(() => {
    timeUtils.getFormattedClassSchedule = jest.fn();
    timeUtils.getFormattedClassSchedule.mockReturnValue('schedule');
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('disables sections that are already scheduled', () => {
    const wrapper = getComponent({ scheduledSections: scheduledSectionsTestData });
    expect(
      wrapper
        .findWhere(
          section => (
            section.is(SectionResultContainer) && section.key() === scheduledSectionsTestData[0].id
          ),
        )
        .prop('disabled'),
    ).toBe(true);
  });
});
