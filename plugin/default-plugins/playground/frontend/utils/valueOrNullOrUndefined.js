/**
 * Depending on if null & undefined are allowed they are returned about 10% of the time
 *
 * @param  {any}    value          The value we use if it's not null or undefined
 * @param  {bool} canBeNull        If the returned value can be null
 * @param  {bool} canBeUndefined   If the returned value can be undefined
 *
 * @return {any}    Either the initial value or, in 10% of the cases, null or undefined
 */
const valueOrNullOrUndefined = (value, canBeNull, canBeUndefined) => {
  const random = Math.random();
  if (canBeNull && random < 0.025) {
    return null;
  } else if (canBeUndefined && random > 0.975) {
    return undefined;
  }

  return value;
};

export default valueOrNullOrUndefined;
