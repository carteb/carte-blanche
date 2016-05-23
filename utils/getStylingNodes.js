/* eslint-disable no-var, vars-on-top */

var filter = require('lodash/filter');

var NUMBER_OF_STYLE_TAGS_BY_INTERFACE = 3;

/**
 * Returns all styling related notes on the page. If the first argument is set
 * to true, it only returns those that style the interface, if it is set to false
 * it only returns those that style the rendered components.
 *
 * @param  {bool} interfaceStyleTags
 * @return {array}                       The wanted style nodes
 */
var getStylingNodes = (interfaceStyleTags = false) => {
  // Get all the styling of the components. These tags are injected by style-loader
  // and we can grab all of them and inject them into each iframe of the variations
  var stylingNodes = document.querySelectorAll('link[rel=stylesheet], style');
  // Discard or keep NUMBER_OF_STYLE_TAGS_BY_INTERFACE amount of <style> tags
  var filteredStylingNodes = 0;
  return filter(stylingNodes, (stylingNode) => {
    if (stylingNode.nodeName === 'STYLE'
        && filteredStylingNodes <= NUMBER_OF_STYLE_TAGS_BY_INTERFACE) {
      filteredStylingNodes++;
      return interfaceStyleTags;
    }
    return !interfaceStyleTags;
  });
};

module.exports = getStylingNodes;
