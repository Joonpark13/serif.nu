import { fromJS } from 'immutable';

export default function splitBySchedules(section) {
  // The schedule field in a section object is an array
  // So we want to deal with each item separately
  const splitByScheduleItem = section.get('schedule').map(
    scheduleItem => section.set('event', scheduleItem),
  );
  // Then we want to create a new section for each dow
  let result = fromJS([]);
  splitByScheduleItem.forEach((sectionItem) => {
    const dows = sectionItem.getIn(['event', 'dow']);
    if (dows === 'TBA') {
      result = result.push(sectionItem);
    } else {
      const splitByDow = sectionItem.getIn(['event', 'dow']).map(
        dow => sectionItem.setIn(['event', 'dow'], dow),
      );
      result = result.concat(splitByDow);
    }
  });
  // The result will be a list of section objects, each with a event field formatted as:
  /*
    {
      dow: 'Mo', (notice how dow is now a string, not an array of strings)
      start: (same as schedule),
      end: (same as schedule),
    }
   */
  // (Notice how the event field now contains an object, not an array)
  return result;
}
