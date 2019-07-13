import { currentTermSelector } from 'selectors';

export const ENHANCE_WITH_CURRENT_TERM_ID = Symbol('ENHANCE WITH CURRENT TERM');
const termIdEnhancer = {
  id: ENHANCE_WITH_CURRENT_TERM_ID,
  mapState: state => ({ currentTermId: currentTermSelector(state).get('id') }),
};

const enhancers = [termIdEnhancer];
export default enhancers;
