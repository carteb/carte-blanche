const MULTIPLIER = Math.pow(2, 24);

/*
 * generateKey
 *
 * Inspired by: https://github.com/facebook/draft-js/blob/67c5e69499e3b0c149ce83b004872afdf4180463/src/model/keys/generateRandomKey.js
 *
 * TODO: With this version duplicates are possible even locally. We need a better strategy before
 * the 1.0.0 release.
 */
const generateKey = () => {
  let key;
  while (key === undefined || !isNaN(+key)) {
    key = Math.floor(Math.random() * MULTIPLIER).toString(32);
  }
  return key;
};

export default generateKey;
