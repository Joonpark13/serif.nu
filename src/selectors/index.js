export function sectionsSelector(state) {
  return state.getIn(['schedule', 'sections']);
}

export function currentBrowseLevelSelector(state) {
  return state.getIn(['browse', 'currentBrowseLevel']);
}
