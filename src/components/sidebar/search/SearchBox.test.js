import { TextField } from '@material-ui/core';
import { fetchSearchResultsRequest } from 'actions';
import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import { UnstyledSearchBox, styles } from './SearchBox';

describe('SearchBox', () => {
  function makeEventObject(value) {
    // This object gets passed to the onChange function of TextField
    return { target: { value } };
  }
  const testSearchInput = 'EECS';
  const defaultProps = {
    handleSearchInput: () => {},
    clearSearchResults: () => {},
    updateSearchInput: () => {},
    currentSearchInput: '',
  };
  const getWrapper = wrapperCreator(UnstyledSearchBox, defaultProps, styles);

  let dispatchMock;
  beforeEach(() => {
    mockUseSelector(testSearchInput);
    dispatchMock = mockUseDispatch();
  });


  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders text typed into the search box', () => {
    const wrapper = getWrapper();

    const eventObject = makeEventObject(testSearchInput);
    wrapper.find(TextField).first().simulate('change', eventObject);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('doesn\'t call api unless it has been 300ms since last keystroke', (completed) => {
    const handleSearchInputMock = jest.fn();

    const wrapper = getWrapper({ handleSearchInput: handleSearchInputMock });

    expect(dispatchMock).not.toBeCalled();

    const eventObject = makeEventObject(testSearchInput);
    wrapper.find(TextField).first().simulate('change', eventObject);

    expect(dispatchMock).not.toHaveBeenCalledWith(fetchSearchResultsRequest(''));

    // Async test, would end after this statement but then the expect wouldn't
    // contribute to test results
    setTimeout(((jestCompleted) => {
      expect(dispatchMock).toHaveBeenCalledWith(fetchSearchResultsRequest(testSearchInput));
      jestCompleted();
    }).bind(null, completed), 300);
  });

  it('doesn\'t call api through handler if search string <= 2 chars long', () => {
    const handleSearchInputMock = jest.fn();
    const wrapper = getWrapper({ handleSearchInput: handleSearchInputMock });

    const shortTestSearchInput = 'EE';
    const eventObject = makeEventObject(shortTestSearchInput);
    wrapper.find(TextField).first().simulate('change', eventObject);
    expect(handleSearchInputMock).not.toBeCalled();
  });
});
