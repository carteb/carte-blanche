import constructorIndexInArray from './constructorIndexInArray';

/**
 * Take a good guess if a webpack compiler instance is running in production
 *
 * @param  {Object} compiler
 *
 * @return {Bool}
 */
function inProd(compiler) {
  return process.env.NODE_ENV === 'production' || // $ NODE_ENV=production webpack …
		constructorIndexInArray(compiler.options.plugins, 'UglifyJsPlugin'); // $ webpack -p …
}

export default inProd;
