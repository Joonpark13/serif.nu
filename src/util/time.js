export function formatMinute(minute) {
  if (minute < 10) return `0${minute}`;
  return `${minute}`;
}

export function formatTime(time, includeAmPm = true) {
  if (time.hour === 0) return `12:${formatMinute(time.minute)}${includeAmPm ? ' AM' : ''}`;
  if (time.hour < 12) return `${time.hour}:${formatMinute(time.minute)}${includeAmPm ? ' AM' : ''}`;
  if (time.hour === 12) return `12:${formatMinute(time.minute)}${includeAmPm ? ' PM' : ''}`;
  return `${time.hour - 12}:${formatMinute(time.minute)}${includeAmPm ? ' PM' : ''}`;
}

export function getFormattedClassSchedule(schedule, includeDow = true, includeAmPm = true) {
  if (schedule.dow === 'TBA' || schedule.start === 'TBA' || schedule.end === 'TBA') {
    return 'TBA';
  }
  let result = '';
  if (includeDow) {
    const dowStr = schedule.dow.join('');
    result += `${dowStr} `;
  }
  return `${result}${formatTime(schedule.start, includeAmPm)} - ${formatTime(schedule.end, includeAmPm)}`;
}

export function getDurationInHours(schedule) {
  const hoursDiff = schedule.end.hour - schedule.start.hour;
  const minutesDiff = schedule.end.minute - schedule.start.minute;
  return hoursDiff + minutesDiff / 60;
}
