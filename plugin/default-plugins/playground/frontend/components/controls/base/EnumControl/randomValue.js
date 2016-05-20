export default (propTypeData) => {
  const randomValue = propTypeData.value[Math.floor(Math.random() * propTypeData.value.length)];

  // TODO check for randomValue.computed == true;
  return eval(randomValue.value); // eslint-disable-line no-eval
};
