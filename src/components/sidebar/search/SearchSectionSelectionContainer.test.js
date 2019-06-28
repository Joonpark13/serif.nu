import { viewSearch, addSectionFromSearch } from 'actions';
import { mockUseSelector, wrapperCreator, mockUseDispatch } from 'util/testing';
import SectionSelection from '../common/SectionSelection';
import SearchSectionSelectionContainer from './SearchSectionSelectionContainer';

describe('SearchSectionSelectionContainer', () => {
  const getWrapper = wrapperCreator(SearchSectionSelectionContainer);
  let dispatchMock;

  beforeEach(() => {
    mockUseSelector('course name', [], []);
    dispatchMock = mockUseDispatch();
  });

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('navigates to search when navigating back', () => {
    const wrapper = getWrapper();
    wrapper.find(SectionSelection).props().back();

    expect(dispatchMock).toHaveBeenCalledWith(viewSearch());
  });

  it('adds section', () => {
    const wrapper = getWrapper();
    const section = {};
    wrapper.find(SectionSelection).props().addSection(section);

    expect(dispatchMock).toHaveBeenCalledWith(
      addSectionFromSearch(section),
    );
  });
});
