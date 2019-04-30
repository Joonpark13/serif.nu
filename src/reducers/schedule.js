import { fromJS } from 'immutable';
import { classColors, northwesternPurple30 } from 'util/colors';
import * as actionTypes from 'actions/action-types';
import getNextColor from './add-section-handler-helpers/get-next-color';
import splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import assignConflictInfo from './add-section-handler-helpers/assign-conflict-info';
import assignColor from './add-section-handler-helpers/assign-color';

const colorUsesInitialState = {};
classColors.forEach((color) => {
  colorUsesInitialState[color] = 0;
});
export const initialScheduleState = fromJS({
  sections: [],
  associatedClasses: [],
  sectionPreview: [],
  associatedClassPreview: [],
  colorUses: colorUsesInitialState,
});

function updatedColorUses(color, colorUses, dec = false) {
  return colorUses.update(color, colorCount => colorCount + (dec ? -1 : 1));
}

function handleAddSection(state, { section }) {
  let sections = state.get('sections');
  sections = sections.concat(splitBySchedules(fromJS(section)));
  sections = assignConflictInfo(sections);

  // TODO: Figure out what to do if all associated classes are unscheduled
  if (section.associatedClasses) {
    const sectionsCurrentlyBeingAdded = sections.filter(
      sectionWithConflictInfo => sectionWithConflictInfo.get('id') === section.id,
    );
    const alreadyExistingSections = sections.filter(
      sectionWithConflictInfo => sectionWithConflictInfo.get('id') !== section.id,
    );
    return state.merge({
      sectionPreview:
        sectionsCurrentlyBeingAdded.map(
          sectionBeingAdded => sectionBeingAdded.set('color', northwesternPurple30),
        ),
      sections: alreadyExistingSections,
    });
  }

  const colorUses = state.get('colorUses');
  const color = getNextColor(colorUses);
  sections = assignColor(color, sections);

  return state.merge({
    sections,
    sectionPreview: initialScheduleState.get('sectionPreview'),
    colorUses: updatedColorUses(color, colorUses),
  });
}

function formatAssociatedClass(associatedClass, sectionId) {
  const formattedAssociatedClass = Object.assign({}, associatedClass);
  formattedAssociatedClass.sectionId = sectionId;
  formattedAssociatedClass.event = Object.assign(
    {},
    formattedAssociatedClass.schedule,
    { dow: formattedAssociatedClass.schedule.dow[0] },
  );

  return fromJS(formattedAssociatedClass);
}

function handleAddSectionWithAssociatedClass(state, { associatedClass }) {
  const sections = state.get('sectionPreview').map(section => section.delete('color'));

  const sectionId = sections.getIn([0, 'id']);
  const formattedAssociatedClass = formatAssociatedClass(associatedClass, sectionId);

  const allSections = state.get('sections').concat(sections);
  const allAssociatedClasses = state.get('associatedClasses').push(formattedAssociatedClass);
  const sectionsAndAssociatedClasses = allSections.concat(allAssociatedClasses);
  const sectionsAndAssociatedClassesWithConflictInfo = assignConflictInfo(
    sectionsAndAssociatedClasses,
  );

  const sectionsWithConflictInfo = sectionsAndAssociatedClassesWithConflictInfo.filter(
    sectionOrAssociatedClass => sectionOrAssociatedClass.get('id'),
  );
  // Associated classes do not have an id field
  const associatedClassesWithConflictInfo = sectionsAndAssociatedClassesWithConflictInfo.filter(
    sectionOrAssociatedClass => !sectionOrAssociatedClass.get('id'),
  );

  const colorUses = state.get('colorUses');
  const color = getNextColor(colorUses);
  const sectionsWithConflictInfoAndColor = assignColor(color, sectionsWithConflictInfo);
  const associatedClassWithConfictInfoAndColor = assignColor(
    color,
    associatedClassesWithConflictInfo,
  );

  return state.merge({
    sections: sectionsWithConflictInfoAndColor,
    sectionPreview: initialScheduleState.get('sectionPreview'),
    associatedClasses: associatedClassWithConfictInfoAndColor,
    associatedClassPreview: initialScheduleState.get('associatedClassPreview'),
    colorUses: updatedColorUses(color, colorUses),
  });
}

function handleRemoveSection(state, { sectionId, sectionColor }) {
  const sections = state.get('sections');
  const associatedClasses = state.get('associatedClasses');
  const colorUses = state.get('colorUses');
  return state.merge({
    sections: sections.filter(section => section.get('id') !== sectionId),
    associatedClasses:
      associatedClasses.filter(
        associatedClass => associatedClass.get('sectionId') !== sectionId,
      ),
    colorUses: updatedColorUses(sectionColor, colorUses, true),
  });
}

function handleSectionHover(state, { section }) {
  const sections = splitBySchedules(fromJS(section));
  const sectionsWithColor = sections.map(
    splitSection => splitSection.set('color', northwesternPurple30),
  );

  return state.set('sectionPreview', sectionsWithColor);
}

function handleSectionHoverOff(state) {
  return state.set('sectionPreview', initialScheduleState.get('sectionPreview'));
}

function handleAssociatedClassHover(state, { associatedClass }) {
  const sections = state.get('sectionPreview');
  const sectionId = sections.getIn([0, 'id']);
  const formattedAssociatedClass = formatAssociatedClass(associatedClass, sectionId);
  const associatedClassWithColor = formattedAssociatedClass.set('color', northwesternPurple30);

  return state.set('associatedClassPreview', fromJS([associatedClassWithColor]));
}

function handleAssociatedClassHoverOff(state) {
  return state.set('associatedClassPreview', initialScheduleState.get('associatedClassPreview'));
}

function schedule(state = initialScheduleState, action) {
  switch (action.type) {
    case actionTypes.ADD_SECTION_FROM_SEARCH:
    case actionTypes.ADD_SECTION_FROM_BROWSE:
      return handleAddSection(state, action);

    case actionTypes.REMOVE_SECTION:
      return handleRemoveSection(state, action);

    case actionTypes.VIEW_SECTION_SELECTION:
      return state.set('sectionPreview', initialScheduleState.get('sectionPreview'));

    case actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_SEARCH:
    case actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS_FROM_BROWSE:
      return handleAddSectionWithAssociatedClass(state, action);

    case actionTypes.SECTION_HOVER:
      return handleSectionHover(state, action);
    case actionTypes.SECTION_HOVER_OFF:
      return handleSectionHoverOff(state);

    case actionTypes.ASSOCIATED_CLASS_HOVER:
      return handleAssociatedClassHover(state, action);
    case actionTypes.ASSOCIATED_CLASS_HOVER_OFF:
      return handleAssociatedClassHoverOff(state);

    default:
      return state;
  }
}

export default schedule;
