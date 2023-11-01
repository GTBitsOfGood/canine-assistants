const upperFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const toUpperEveryWord = (str) => {
  if (str.length === 0) return "";

  return str
    .split(" ")
    .reduce((prev, curr, index) => prev + upperFirstLetter(curr) + " ", "")
    .trim();
};

const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

const stringUtils = {
  upperFirstLetter,
  toUpperEveryWord,
  toCamelCase,
};

export default stringUtils;
