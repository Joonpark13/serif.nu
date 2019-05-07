import Button from '@material-ui/core/Button';
import { wrapperCreator } from 'util/testing';
import { UnstyledClassModal, styles } from './ClassModal';

describe('ClassModal', () => {
  const section = {
    id: '198732',
    sectionNumber: 20,
    topic: 'Section topic...',
    schedule: [{ location: 'somewhere' }],
    instructors: ['A prof'],
    color: '#58B947',
  };
  const defaultProps = {
    section,
    showDialog: true,
    toggleDialog: () => {},
    removeSection: () => {},
  };

  const getWrapper = wrapperCreator(UnstyledClassModal, defaultProps, styles);

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('calls correct prop function when clicked', () => {
    const removeSectionMock = jest.fn();
    const wrapper = getWrapper({ removeSection: removeSectionMock });
    wrapper.find(Button).first().simulate('click');

    expect(removeSectionMock).toHaveBeenCalledWith(section.id, section.color);
  });
});
