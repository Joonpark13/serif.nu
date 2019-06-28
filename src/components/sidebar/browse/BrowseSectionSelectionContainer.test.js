import { addSectionFromBrowse, changeBrowseLevel } from 'actions';
import { mockUseSelector, wrapperCreator, mockUseDispatch } from 'util/testing';
import SectionSelection from '../common/SectionSelection';
import BrowseSectionSelectionContainer from './BrowseSectionSelectionContainer';

describe('BrowseSectionSelectionContainer', () => {
  const getWrapper = wrapperCreator(BrowseSectionSelectionContainer);
  let dispatchMock;

  beforeEach(() => {
    mockUseSelector('course name', [], []);
    dispatchMock = mockUseDispatch();
  });

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes browse level when navigating back', () => {
    const wrapper = getWrapper();
    wrapper.find(SectionSelection).props().back();

    expect(dispatchMock).toHaveBeenCalledWith(changeBrowseLevel('course'));
  });

  it('adds section', () => {
    const wrapper = getWrapper();
    const section = {};
    wrapper.find(SectionSelection).props().addSection(section);

    expect(dispatchMock).toHaveBeenCalledWith(
      addSectionFromBrowse(section),
    );
  });
});
