/*
 * Returns either null, undefined or the provided value.
 *
 * Depending on if null & undefined are allowed each of them is returned about
 * 10% of the time.
 */
const valueOrNullOrUndefined = (value, canBeNull, canBeUndefined) => {
  const random = Math.random();
  if (canBeNull && random < 0.1) {
    return null;
  } else if (canBeUndefined && random > 0.9) {
    return undefined;
  }

  return value;
};

export default valueOrNullOrUndefined;
