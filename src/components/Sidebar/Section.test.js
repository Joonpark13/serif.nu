import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledSection, styles } from './Section';

jest.mock('util/time');

describe('Section', () => {
  const formattedSchedule = 'MWF 10 - 12ish';
  timeUtils.getFormattedClassSchedule.mockReturnValue(formattedSchedule);

  const section = {
    id: '198732',
    sectionNumber: 20,
    topic: 'Section topic...',
    schedule: [{ location: 'somewhere' }],
    instructors: ['A prof'],
  };
  const defaultProps = {
    addSection: () => {},
    section,
  };
  const getWrapper = wrapperCreator(UnstyledSection, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders instructors correctly for multiple instructors', () => {
    const wrapper = getWrapper({ section: { ...section, instructors: ['Prof 1', 'Prof 2'] } });

    expect(wrapper.find(Typography).at(4).prop('children')).toEqual(['Prof 1, ', 'Prof 2']);
  });

  it('calls correct prop function when clicked', () => {
    const addSectionMock = jest.fn();
    const wrapper = getWrapper({ addSection: addSectionMock });
    wrapper.find(ListItem).simulate('click');

    expect(addSectionMock).toHaveBeenCalledWith(section);
  });
});
