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

const dateutils = {
  getAge,
  getDateString,
  getTimeString,
};

export default dateutils;
