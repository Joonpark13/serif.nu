export function getHours() {
  const hours = [];
  for (let i = 8; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
}

export function parseHour(timeStr) {
  // timeStr format: 3:00PM or 11:50AM
  const hour = parseInt(timeStr.split(':')[0], 10);
  const ampm = timeStr.slice(-2);
  if (ampm === 'AM') {
    if (hour === 12) return 0; // 12AM
    return hour; // All other AMs
  }
  if (hour === 12) return hour; // 12PM
  return hour + 12; // All other PMs
}

export function parseMinute(timeStr) {
  // timeStr format: 3:00PM or 11:50AM
  return parseInt(timeStr.split(':')[1].slice(0, 2), 10);
}

export function parseMeetingTime(meetingTime) {
  // meetingTime format: MoWe 11:00AM - 11:50AM or MoWeFr 3:00PM - 3:50PM
  // If class is unscheduled, meetingTime will be 'TBA'
  if (meetingTime === 'TBA') return meetingTime;

  const splitStr = meetingTime.split(' ');
  const dow = splitStr[0];
  const start = splitStr[1];
  // the dash is splitStr[2]
  const end = splitStr[3];

  return {
    dow: dow.match(/.{2}/g), // Array of dow str broken up every two chars, ex: ['Mo', 'We']
    start: {
      hour: parseHour(start),
      minute: parseMinute(start),
    },
    end: {
      hour: parseHour(end),
      minute: parseMinute(end),
    },
  };
}
