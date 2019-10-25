import { ListItem } from '@material-ui/core';
import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import { fetchSectionsForSearchRequest, setCurrentCourseName } from 'actions';
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
  const testSearchInput = 'EECS';

  const getComponent = wrapperCreator(UnstyledSearchResults, undefined, styles);

  beforeEach(() => {
    mockUseSelector(testResults, false, testSearchInput);
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    mockUseSelector(testResults, true, testSearchInput);
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it("renders 'keep typing' correctly", () => {
    mockUseSelector(testResults, false, 'EE');
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it("renders 'no results' correctly", () => {
    mockUseSelector([], false, 'ABCD');
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('handleCourseClick gets called correctly', () => {
    const dispatchMock = mockUseDispatch();
    const wrapper = getComponent();

    wrapper.find(ListItem).first().simulate('click');

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchSectionsForSearchRequest(
        testResults[0].schoolId,
        testResults[0].subjectId,
        testResults[0].id,
      ),
    );
    expect(dispatchMock).toHaveBeenCalledWith(
      setCurrentCourseName(`${testResults[0].subjectId} ${testResults[0].id}`),
    );
  });
});
