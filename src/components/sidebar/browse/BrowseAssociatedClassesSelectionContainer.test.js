import { mockUseSelector, wrapperCreator, mockUseDispatch } from 'util/testing';
import {
  changeBrowseLevel,
  addSectionWithAssociatedClassFromBrowse,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';
import BrowseAssociatedClassesSelectionContainer from './BrowseAssociatedClassesSelectionContainer';

describe('BrowseAssociatedClassesSelectionContainer', () => {
  const getWrapper = wrapperCreator(BrowseAssociatedClassesSelectionContainer);
  let dispatchMock;

  beforeEach(() => {
    mockUseSelector('101-0', '12345', []);
    dispatchMock = mockUseDispatch();
  });

  it('renders correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes browse level when navigating back', () => {
    const wrapper = getWrapper();
    wrapper.find(AssociatedClassesSelection).props().back();

    expect(dispatchMock).toHaveBeenCalledWith(changeBrowseLevel('section'));
  });

  it('adds section with associated class', () => {
    const wrapper = getWrapper();
    const associatedClass = {};
    wrapper.find(AssociatedClassesSelection).props().addSectionWithAssociatedClass(associatedClass);

    expect(dispatchMock).toHaveBeenCalledWith(
      addSectionWithAssociatedClassFromBrowse(associatedClass),
    );
  });

  it('shows hovered associated class', () => {
    const wrapper = getWrapper();
    const associatedClass = {};
    wrapper.find(AssociatedClassesSelection).props().associatedClassHover(associatedClass);

    expect(dispatchMock).toHaveBeenCalledWith(
      associatedClassHover(associatedClass),
    );
  });

  it('hides unhovered associated class', () => {
    const wrapper = getWrapper();
    wrapper.find(AssociatedClassesSelection).props().associatedClassHoverOff();

    expect(dispatchMock).toHaveBeenCalledWith(associatedClassHoverOff());
  });
});
