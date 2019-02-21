import { fromJS } from 'immutable';
import { classColors } from 'util/colors';
import * as actionTypes from '../actions/action-types';

export const initialScheduleState = fromJS({
  sections: [],
});

function getNextColor(sectionsLength) {
  return classColors[sectionsLength % classColors.length];
}

function handleAddSection(state, { section }) {
  const color = getNextColor(state.get('sections').size);
  const sectionWithColor = Object.assign({}, section, { color });
  return state.update(
    'sections',
    sections => sections.push(fromJS(sectionWithColor)),
  );
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
