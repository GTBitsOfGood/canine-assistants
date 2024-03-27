const getAge = (date) => {
  const ageRaw = Date.now() - date;
  const ageYrs = new Date(ageRaw).getFullYear() - 1970;
  if (ageYrs < 1) {
    const ageMonths = new Date(ageRaw).getMonth();
    return ageMonths === 0 ? "0 months" : `${ageMonths} months`;
  }
  return `${ageYrs} ${ageYrs !== 1 ? "years" : "year"}`;
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
  const amPmString = date.getHours() / 12 < 1 ? "AM" : "PM";

  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    String(date.getFullYear()).slice(2) +
    " " +
    (date.getHours() == 0 ? 12 : date.getHours() % 12) +
    ":" +
    date.getMinutes() +
    " " +
    amPmString
  );
};

const displayDate = (dateString) => {
  const date = new Date(dateString);
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    String(date.getFullYear()).slice(2)
  );
};

const dateutils = {
  getAge,
  getDateString,
  getTimeString,
  displayDateAndTime,
  displayDate,
};

export default dateutils;
