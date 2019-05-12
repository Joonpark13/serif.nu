import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { wrapperCreator } from 'util/testing';
import { UnstyledBrowseHeader, styles } from './BrowseHeader';

describe('BrowseHeader', () => {
  const defaultProps = {
    currentBrowseLevel: 'school',
    back: () => {},
  };
  const getComponent = wrapperCreator(UnstyledBrowseHeader, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders correctly for subject browse level', () => {
    const selectedSchoolId = '1234';
    const wrapper = getComponent({ currentBrowseLevel: 'subject', selectedSchoolId });

    expect(wrapper.find(Typography).prop('children')).toBe(selectedSchoolId);
  });

  it('renders correctly for course browse level', () => {
    const selectedSubjectId = 'MEAS';
    const wrapper = getComponent({ currentBrowseLevel: 'course', selectedSubjectId });

    expect(wrapper.find(Typography).prop('children')).toBe(selectedSubjectId);
  });

  it('goes back a level to schools from subjects', () => {
    const backMock = jest.fn();
    const wrapper = getComponent({
      currentBrowseLevel: 'subject',
      selectedSchoolId: 'WCAS',
      back: backMock,
    });

    wrapper.find(Button).simulate('click');

    expect(backMock).toHaveBeenCalledWith('school');
  });

  it('goes back a level to subjects from courses', () => {
    const backMock = jest.fn();
    const wrapper = getComponent({
      currentBrowseLevel: 'course',
      selectedSubjectId: 'EECS',
      back: backMock,
    });

    wrapper.find(Button).simulate('click');

    expect(backMock).toHaveBeenCalledWith('subject');
  });
});
