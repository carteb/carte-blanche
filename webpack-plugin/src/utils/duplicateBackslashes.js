/**
 * Duplicate every backslash found in a string
 *
 * @param  {String}   str
 * @return {String}
 */
export default (str = '') => str.replace(/\\/g, '\\\\');
