import ListItem from '@material-ui/core/ListItem';
import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledSectionSelection, styles } from './SectionSelection';

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
    back: () => {},
    addSection: () => {},
  };
  const getComponent = wrapperCreator(UnstyledSectionSelection, defaultProps, styles);

  beforeEach(() => {
    timeUtils.getFormattedClassSchedule = jest.fn();
    timeUtils.getFormattedClassSchedule.mockReturnValue('schedule');
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('calls addSection when section is clicked', () => {
    const addSectionMock = jest.fn();
    const wrapper = getComponent({ addSection: addSectionMock });

    wrapper.find(ListItem).first().simulate('click');

    expect(addSectionMock).toHaveBeenCalledWith(defaultProps.sections[0]);
  });
});
