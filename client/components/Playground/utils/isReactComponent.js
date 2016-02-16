export default (component) => {
  if (typeof component === 'function') {
    return true;
  } else if (typeof component === 'object' && typeof component.render === 'function') {
    return true;
  }

  return false;
};
