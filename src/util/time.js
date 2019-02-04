export function formatMinute(minute) {
  if (minute < 10) return `0${minute}`;
  return `${minute}`;
}

export function formatTime(time) {
  if (time.hour === 0) return `12:${formatMinute(time.minute)} AM`;
  if (time.hour < 12) return `${time.hour}:${formatMinute(time.minute)} AM`;
  if (time.hour === 12) return `12:${formatMinute(time.minute)} PM`;
  return `${time.hour - 12}:${formatMinute(time.minute)} PM`;
}

export function getFormattedClassSchedule(schedule) {
  const dowStr = schedule.dow.join('');
  return `${dowStr} ${formatTime(schedule.start)} - ${formatTime(schedule.end)}`;
}
