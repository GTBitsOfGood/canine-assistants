const getAge = (date) => {
  return new Date(Date.now() - date).getFullYear() - 1970;
};

const getDateString = (date) => {
  return date.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getTimeString = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // or false for 24-hour time format
  });
};

const displayDateAndTime = (dateString) => {
  const date = new Date(dateString);
  const amPmString = date.getHours() / 12 < 1 ? "AM" : "PM"

  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + String(date.getFullYear()).slice(2) + " "
    + (date.getHours() == 0 ? 12 : date.getHours() % 12) + ":" + date.getMinutes() + " " + amPmString;
}

const dateutils = {
  getAge,
  getDateString,
  getTimeString,
  displayDateAndTime,
};

export default dateutils;
