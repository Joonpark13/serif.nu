export function getHours() {
  const hours = [];
  for (let i = 8; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
}

export function meetsDuringDow(eventObj, dow) {
  return eventObj.dow.includes(dow);
}

export function meetsDuringHour(eventObj, hour) {
  return hour === eventObj.start.hour;
}
