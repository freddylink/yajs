const utilsFunctions = {
  getRandomNumber: (min, max) => Math.floor(Math.random() * (max - min) + min),
  getRandFromArr: (arr) => {
    const index = utilsFunctions.getRandomNumber(0, arr.length);
    return arr[index];
  },

};
const returnRandomData = () => {
  const data = {};
  data.names = utilsFunctions.getRandFromArr(RATING_LIST.names);
  data.ratings = utilsFunctions.getRandFromArr(RATING_LIST.ratings);
  return data;
};
