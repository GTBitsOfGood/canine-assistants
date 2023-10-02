const upperFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const toUpperEveryWord = (str) => {
    if (str.length === 0) return "";

    return str.split(" ").reduce((prev, curr, index) => prev + upperFirstLetter(curr) + ' ', '').trim(); 
} 

const stringUtils = {
    upperFirstLetter,
    toUpperEveryWord
}   

export default stringUtils;