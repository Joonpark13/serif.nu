import Typography from '@material-ui/core/Typography';
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

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly for subject browse level', () => {
    const selectedSchoolId = '1234';
    const wrapper = getComponent({ currentBrowseLevel: 'subject', selectedSchoolId });

    expect(wrapper.find(Typography).prop('children')).toBe(selectedSchoolId);
  });
});
