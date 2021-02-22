const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const mode = (process.env.NODE_ENV === 'production') ? 'production' : 'development';
const publicOutputPath = 'http://localhost:9002/wp/';

console.log(mode);

module.exports = {
  mode,
  // In production, always be IE11 compatible. In dev, be IE11 compatible
  // if IE11=1 is in the environment, as this currently breaks hot reload:
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: process.env.IE11 ? 'es5' : (mode === 'development') ? 'web' : 'es5',
  entry: [ './src/index.js', './src/index.scss' ],
  output: {
    ...((mode === 'development') ? {
      filename: 'site.js',
      publicPath: publicOutputPath
    } : {
      path: path.resolve(
        __dirname, '/modules/asset/ui/public'
      ),
      filename: 'site.js'
    })
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'site.css'
    })
  ],
  ...((mode === 'development') ? {
    devServer: {
      hot: true,
      inline: true,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      publicPath: '/wp/',
      port: 9002,
      allowedHosts: [
        '.localhost'
      ],
      proxy: {
        '/': 'http://localhost:3000'
      }
    }
  } : {}),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ '@babel/preset-env' ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          // Instead of style-loader, to avoid FOUC
          MiniCssExtractPlugin.loader,
          // Parses CSS imports
          'css-loader',
          // Parses SASS imports
          'sass-loader'
        ]
      }
    ]
  }
};
