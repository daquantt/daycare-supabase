import moment from "moment";

export function timeCalculator(start, end) {
  const startTime = moment.duration(start, "HH:mm");
  const endTime = moment.duration(end, "HH:mm");
  const difference = endTime.subtract(startTime);
  const totalTime = difference.hours() + "h " + difference.minutes() + "m";
  return totalTime;
}
