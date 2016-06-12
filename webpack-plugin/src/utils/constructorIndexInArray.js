/**
 * Check if an array contains a constructor with a certain name
 */
const constructorIndexInArray = (array, name) => {
  // The first argument has to be an array
  if (!Array.isArray(array)) {
    // eslint-disable-next-line max-len
    throw new Error('[CarteBlanche] constructorIndexInArray: The first argument must be an array.');
  }
  for (let i = 0; i < array.length; i++) {
    // Check the constructor name of the current array element
    if (array[i] && array[i].constructor.name === name) {
      return i;
    }
  }
  return false;
};

export default constructorIndexInArray;
