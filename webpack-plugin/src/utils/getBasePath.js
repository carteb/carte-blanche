import path from 'path';

export default (compiler, pluginOptions) => {
  const publicPath = compiler.options.output.publicPath || '';
  const dest = pluginOptions.dest || '';
  return publicPath || dest ? path.join('/', publicPath, dest) : '';
};
