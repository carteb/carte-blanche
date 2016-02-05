module.exports = (source) => {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(source);
};
