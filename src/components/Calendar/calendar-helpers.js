export function getHours() {
  const hours = [];
  for (let i = 8; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
}

export function meetsDuringDow(scheduleObj, dow) {
  return scheduleObj.dow.includes(dow);
}

export function meetsDuringHour(scheduleObj, hour) {
  return hour === scheduleObj.start.hour;
}

export function getScheduleObjGivenHourAndDow(schedules, hour, dow) {
  return schedules.find(
    scheduleObj => meetsDuringDow(scheduleObj, dow) && meetsDuringHour(scheduleObj, hour),
  );
}
