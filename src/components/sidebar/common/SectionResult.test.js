import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledSectionResult, styles } from './SectionResult';

jest.mock('util/time');

describe('SectionResult', () => {
  const formattedSchedule = 'MWF 10 - 12ish';
  timeUtils.getFormattedClassSchedule.mockReturnValue(formattedSchedule);

  const section = {
    id: '198732',
    sectionNumber: 20,
    topic: 'Section topic...',
    schedules: [{ location: 'somewhere' }],
    instructors: ['A prof'],
  };
  const defaultProps = {
    addSection: () => {},
    section,
    sectionHover: () => {},
    sectionHoverOff: () => {},
  };
  const getWrapper = wrapperCreator(UnstyledSectionResult, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders instructors correctly for multiple instructors', () => {
    const wrapper = getWrapper({ section: { ...section, instructors: ['Prof 1', 'Prof 2'] } });

    expect(wrapper.find(Typography).at(4).prop('children')).toEqual(['Prof 1, ', 'Prof 2']);
  });

  it('adds section when clicked', () => {
    const addSectionMock = jest.fn();
    const wrapper = getWrapper({ addSection: addSectionMock });
    wrapper.find(ListItem).simulate('click');

    expect(addSectionMock).toHaveBeenCalledWith(section);
  });

  it('turns scheduled text to red if section is unscheduled', () => {
    timeUtils.getFormattedClassSchedule.mockReturnValue('TBA');
    timeUtils.isUnscheduled.mockReturnValue(true);
    const unscheduledSection = {
      id: '3',
      sectionNumber: 21,
      schedules: [{
        location: 'Some other building',
        dow: 'TBA',
        start: 'TBA',
        end: 'TBA',
      }],
      instructors: ['Ian Horswill', 'Vincent St-Amour'],
    };
    const wrapper = getWrapper({ section: unscheduledSection });
    const colorProp = wrapper
      .findWhere(
        node => node.is(Typography) && node.prop('children') === 'TBA',
      )
      .prop('color');
    expect(colorProp).toBe('error');
  });

  it('calls sectionHover when clicked', () => {
    const sectionHoverMock = jest.fn();
    const wrapper = getWrapper({ sectionHover: sectionHoverMock });
    wrapper.find(ListItem).simulate('mouseEnter');

    expect(sectionHoverMock).toHaveBeenCalledWith(section);
  });
});
