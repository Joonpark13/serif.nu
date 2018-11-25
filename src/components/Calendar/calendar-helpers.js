/* eslint-disable import/prefer-default-export */
export function getHours() {
  const hours = [];
  for (let i = 8; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
}
