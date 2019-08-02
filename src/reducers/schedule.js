import { fromJS } from 'immutable';
import { classColors, northwesternPurple30 } from 'util/colors';
import { isUnscheduled } from 'util/time';
import * as actionTypes from 'actions/action-types';
import splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import prepClassesForCalendar from './add-section-handler-helpers/prep-classes-for-calendar';
import getNextColor from './add-section-handler-helpers/get-next-color';

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
  const existingSections = state.get('sections');
  const newSections = splitBySchedules(fromJS(section));
  const allSections = existingSections.concat(newSections);
  const color = getNextColor(state.get('colorUses'));
  const { sections } = prepClassesForCalendar(allSections, color);

  const canScheduleAnAssociatedClass = section.associatedClasses
    && section.associatedClasses.some(
      associatedClass => !isUnscheduled(associatedClass.schedule),
    );

  if (canScheduleAnAssociatedClass) {
    const parsedNewSections = sections.filter(
      sectionWithCalendarInfo => sectionWithCalendarInfo.get('id') === section.id,
    );
    const parsedExistingSections = sections.filter(
      sectionWithCalendarInfo => sectionWithCalendarInfo.get('id') !== section.id,
    );
    return state.merge({
      sections: parsedExistingSections,
      sectionPreview:
        parsedNewSections.map(
          newSection => newSection.set('color', northwesternPurple30),
        ),
    });
  }

  return state.merge({
    sections,
    colorUses: updatedColorUses(color, state.get('colorUses')),
    sectionPreview: initialScheduleState.get('sectionPreview'),
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
  const existingSections = state.get('sections');
  const newSections = state.get('sectionPreview').map(section => section.delete('color'));
  const allSections = existingSections.concat(newSections);

  const existingAssociatedClasses = state.get('associatedClasses');
  const sectionId = newSections.getIn([0, 'id']);
  const formattedAssociatedClass = formatAssociatedClass(associatedClass, sectionId);
  const allAssociatedClasses = existingAssociatedClasses.push(formattedAssociatedClass);

  const color = getNextColor(state.get('colorUses'));

  const { sections, associatedClasses } = prepClassesForCalendar(
    allSections,
    color,
    allAssociatedClasses,
  );

  return state.merge({
    sections,
    associatedClasses,
    sectionPreview: initialScheduleState.get('sectionPreview'),
    associatedClassPreview: initialScheduleState.get('associatedClassPreview'),
    colorUses: updatedColorUses(color, state.get('colorUses')),
  });
}

function handleRemoveSection(state, { sectionId, sectionColor }) {
  const remainingSections = state
    .get('sections')
    .filter(section => section.get('id') !== sectionId);
  const remainingAssociatedClasses = state.get('associatedClasses').filter(
    associatedClass => associatedClass.get('sectionId') !== sectionId,
  );

  if (remainingSections.size === 0) {
    return state.merge({
      sections: initialScheduleState.get('sections'),
      associatedClasses: initialScheduleState.get('associatedClasses'),
      colorUses: initialScheduleState.get('colorUses'),
    });
  }

  const { sections, associatedClasses } = prepClassesForCalendar(
    remainingSections,
    null,
    remainingAssociatedClasses,
  );
  return state.merge({
    sections,
    associatedClasses,
    colorUses: updatedColorUses(sectionColor, state.get('colorUses'), true),
  });
}
function handleRemoveAllClasses(state) {
  return state.merge({
    sections: initialScheduleState.get('sections'),
    associatedClasses: initialScheduleState.get('associatedClasses'),
    colorUses: initialScheduleState.get('colorUses'),
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

    case actionTypes.REMOVE_ALL_CLASSES:
      return handleRemoveAllClasses(state, action);

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
