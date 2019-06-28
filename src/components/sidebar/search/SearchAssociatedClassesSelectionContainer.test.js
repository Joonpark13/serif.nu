import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import {
  viewSectionSelection,
  addSectionWithAssociatedClassFromSearch,
  associatedClassHover,
  associatedClassHoverOff,
} from 'actions';
import AssociatedClassesSelection from '../common/AssociatedClassesSelection';
import SearchAssociatedClassesSelectionContainer from './SearchAssociatedClassesSelectionContainer';

describe('SearchAssociatedClassesSelectionContainer', () => {
  const getWrapper = wrapperCreator(SearchAssociatedClassesSelectionContainer);

  let dispatchMock;

  beforeEach(() => {
    mockUseSelector('course name', 'section num', [{}]);
    dispatchMock = mockUseDispatch();
  });

  it('renders', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes browse level when navigating back', () => {
    const wrapper = getWrapper();
    wrapper.find(AssociatedClassesSelection).props().back();

    expect(dispatchMock).toHaveBeenCalledWith(viewSectionSelection());
  });

  it('adds section with associated class', () => {
    const wrapper = getWrapper();
    const associatedClass = {};
    wrapper.find(AssociatedClassesSelection).props().addSectionWithAssociatedClass(associatedClass);

    expect(dispatchMock).toHaveBeenCalledWith(
      addSectionWithAssociatedClassFromSearch(associatedClass),
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
