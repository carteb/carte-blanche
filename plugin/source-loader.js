module.exports = function sourceLoader(source) {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(source);
};
