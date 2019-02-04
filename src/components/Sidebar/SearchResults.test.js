import ListItem from '@material-ui/core/ListItem';
import { mockStyles, wrapperCreator } from 'util/testing';
import { UnstyledSearchResults, styles } from './SearchResults';

describe('SearchResults', () => {
  const testResults = [{
    id: '629',
    name: 'Employment Law',
    schoolId: 'LAW',
    subjectId: 'BUSCOM',
    termId: '4720',
  }, {
    id: '631',
    name: 'Entrepreneurship Law',
    schoolId: 'LAW',
    subjectId: 'BUSCOM',
    termId: '4720',
  }];
  const classes = mockStyles(styles);
  const testSearchInput = 'EECS';

  const defaultProps = {
    searchResults: testResults,
    isFetching: false,
    classes,
    handleCourseClick: () => {},
    currentSearchInput: testSearchInput,
  };
  const getComponent = wrapperCreator(UnstyledSearchResults, defaultProps);

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const wrapper = getComponent({ isFetching: true });

    expect(wrapper).toMatchSnapshot();
  });

  it("renders 'keep typing' correctly", () => {
    const wrapper = getComponent({
      currentSearchInput: 'EE',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it("renders 'no results' correctly", () => {
    const wrapper = getComponent({
      searchResults: [],
      currentSearchInput: 'ABCD',
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('handleCourseClick gets called correctly', () => {
    const handleCourseClickMock = jest.fn();
    const wrapper = getComponent({ handleCourseClick: handleCourseClickMock });

    wrapper.find(ListItem).first().simulate('click');

    expect(handleCourseClickMock)
      .toHaveBeenCalledWith(testResults[0].schoolId, testResults[0].subjectId, testResults[0].id);
  });
});
