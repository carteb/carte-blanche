/**
 * isReactComponent
 *
 * @param  {object|function} component The thing to check
 * @return {bool}            A boolean specifying if it is a react component or not
 */
export default (component) => {
  if (typeof component === 'function') { // TODO Advanced check
    return true;
  } else if (typeof component === 'object' && typeof component.render === 'function') {
    return true;
  }

  return false;
};
