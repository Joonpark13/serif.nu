/* eslint-disable import/prefer-default-export */
export function searchURL(query) {
  return `${process.env.API_URL}/search?term_id=4720&search_query=${query}`;
}

export function sectionsURL(termId, schoolAbbv, subjectAbbv, courseAbbv) {
  return `${process.env.API_URL}/sections?term_id=${termId}&school_abbv=${schoolAbbv}&subject_abbv=${subjectAbbv}&course_abbv=${courseAbbv}`;
}
