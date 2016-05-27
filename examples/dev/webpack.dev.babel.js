import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleguidePlugin from '../../plugin/styleguide-plugin';
import autoprefixer from 'autoprefixer';

// import SourcePlugin from '../../plugin/default-plugins/source/plugin';

export default {
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  entry: [
    path.join(__dirname, './src/index.js'),
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        DISABLE_LOGGER: process.env.DISABLE_LOGGER,
      },
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, './src/index.html'),
    }),
    new StyleguidePlugin({
      include: [
        // match components like Button/index.js
        'src/components/**/[A-Z][a-zA-Z]*/index.js',
        // match components like Button.js
        'src/components/**/[A-Z][a-zA-Z]*.js',
      ],
      // plugins: [
      //   new SourcePlugin(),
      // ],
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],

        // this is a hack for development
        // in the final version we compile it before shipping
        include: [path.join(__dirname, './src'), path.join(__dirname, '../../plugin')],
      }, {
        test: /\.css/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[local]__[path][name]__[hash:base64:5]!postcss-loader', // eslint-disable-line max-len
        include: [path.join(__dirname, './src'), path.join(__dirname, '../../plugin')],
      }, {
        test: /\.(png|jpg|gif)$/,
        loaders: ['url?limit=10000'],
      }, {
        test: /\.(svg)$/,
        loaders: ['url?limit=0'],
      }, {
        test: /\.(json)$/,
        loader: 'json',
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
};
