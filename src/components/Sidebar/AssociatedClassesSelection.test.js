import ListItem from '@material-ui/core/ListItem';
import { wrapperCreator } from 'util/testing';
import * as timeUtils from 'util/time';
import { UnstyledAssociatedClassesSelection, styles } from './AssociatedClassesSelection';

jest.mock('util/time');

describe('Cart', () => {
  const associatedClass = { schedule: { location: 'somewhere' } };
  const defaultProps = {
    currentCourseName: 'Introduction to Something',
    currentSectionNumber: '21',
    associatedClasses: [associatedClass],
    back: () => {},
    addSectionWithAssociatedClass: () => {},
  };
  const getWrapper = wrapperCreator(UnstyledAssociatedClassesSelection, defaultProps, styles);

  const formattedSchedule = 'MWF 10 - 12ish';
  timeUtils.getFormattedClassSchedule.mockReturnValue(formattedSchedule);

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('calls correct prop function when clicked', () => {
    const addSectionWithAssociatedClassMock = jest.fn();
    const wrapper = getWrapper({
      addSectionWithAssociatedClass: addSectionWithAssociatedClassMock,
    });
    wrapper.find(ListItem).simulate('click');

    expect(addSectionWithAssociatedClassMock).toHaveBeenCalledWith(associatedClass);
  });
});
