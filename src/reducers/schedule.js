import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
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
  colorUses: colorUsesInitialState,
});

function updatedColorUses(color, colorUses, dec = false) {
  return colorUses.update(color, colorCount => colorCount + (dec ? -1 : 1));
}

function handleAddSection(state, { section }) {
  let sections = state.get('sections');
  sections = sections.concat(splitBySchedules(fromJS(section)));
  sections = assignConflictInfo(sections);

  // TODO: Check to make sure all associated classes are not unscheduled
  if (section.associatedClasses) {
    const sectionsCurrentlyBeingAdded = sections.filter(
      sectionWithConflictInfo => sectionWithConflictInfo.get('id') === section.id,
    );
    const alreadyExistingSections = sections.filter(
      sectionWithConflictInfo => sectionWithConflictInfo.get('id') !== section.id,
    );
    return state.merge({
      sectionPreview: sectionsCurrentlyBeingAdded,
      sections: alreadyExistingSections,
    });
  }

  const colorUses = state.get('colorUses');
  const color = getNextColor(colorUses);
  sections = assignColor(color, sections);

  return state.merge({
    sections,
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
  const sections = state.get('sectionPreview');

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
    associatedClasses: associatedClassWithConfictInfoAndColor,
    colorUses: updatedColorUses(color, colorUses),
  });
}

function handleRemoveSection(state, { sectionId, sectionColor }) {
  const sections = state.get('sections');
  const colorUses = state.get('colorUses');
  return state.merge({
    sections: sections.filter(section => section.get('id') !== sectionId),
    colorUses: updatedColorUses(sectionColor, colorUses, true),
  });
}

function schedule(state = initialScheduleState, action) {
  switch (action.type) {
    case actionTypes.ADD_SECTION:
      return handleAddSection(state, action);

    case actionTypes.REMOVE_SECTION:
      return handleRemoveSection(state, action);

    case actionTypes.VIEW_SECTION_SELECTION:
      return state.set('sectionPreview', initialScheduleState.get('sectionPreview'));

    case actionTypes.ADD_SECTION_WITH_ASSOCIATED_CLASS:
      return handleAddSectionWithAssociatedClass(state, action);

    default:
      return state;
  }
}

export default schedule;
