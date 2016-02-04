module.exports = function (source) {
  this.cacheable();
  return 'module.exports = ' + JSON.stringify(source);
};
