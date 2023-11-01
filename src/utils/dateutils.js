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

const dateUtils = {
  getAge,
  getDateString,
};

export default dateUtils;
