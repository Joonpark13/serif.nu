import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
import * as actionTypes from '../actions/action-types';
import getNextColor from './add-section-handler-helpers/get-next-color';
import splitBySchedules from './add-section-handler-helpers/split-by-schedules';
import assignConflictInfo from './add-section-handler-helpers/assign-conflict-info';

const colorUsesInitialState = {};
classColors.forEach((color) => {
  colorUsesInitialState[color] = 0;
});
export const initialScheduleState = fromJS({
  sections: [],
  colorUses: colorUsesInitialState,
});

function handleAddSection(state, { section }) {
  let sections = state.get('sections');

  const colorUses = state.get('colorUses');
  const color = getNextColor(colorUses);
  const sectionWithColor = Object.assign({}, section, { color });

  sections = sections.concat(splitBySchedules(fromJS(sectionWithColor)));

  sections = assignConflictInfo(sections);

  return state.merge({
    sections,
    colorUses: colorUses.update(color, colorCount => colorCount + 1),
  });
}

function schedule(state = initialScheduleState, action) {
  switch (action.type) {
    case actionTypes.ADD_SECTION:
      return handleAddSection(state, action);
    default:
      return state;
  }
}

export default schedule;
