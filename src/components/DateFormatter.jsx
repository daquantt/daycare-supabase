export function dateFormatter(dateAsString) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateArray = dateAsString.split("-");
  const year = dateArray[0];
  const month = Number(dateArray[1]);
  const day = dateArray[2];

  const formattedDate = `${day}-${months[month - 1]}-${year}`;

  return formattedDate;
}

export function timeFormatter(time) {
  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

  if (time === undefined || time === "") {
    return "-:--";
  } else {
    const timeArray = time.split(":");
    const hour = Number(timeArray[0]);
    const minute = timeArray[1];

    let formattedHour;

    if (hour > 12) {
      formattedHour = hours[hour - 1];
    } else formattedHour = hour;

    let amOrPm;

    if (time < "12:00") {
      amOrPm = "am";
    } else amOrPm = "pm";

    const formattedTime = `${formattedHour}:${minute} ${amOrPm}`;

    return formattedTime;
  }
}
