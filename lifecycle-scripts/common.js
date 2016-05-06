'use strict'

const path = require('path')

const basedir = path.join(__dirname, '../')

exports.webpack = {
  context: basedir,
  entry: {
    main: './src/entry/main.js'
  },
  output: {
    path: path.join(basedir, './build/bundle/'),
    publicPath: '/s/',
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        eexclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015-webpack', 'stage-0', 'react']
        }
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      }
    ]
  },
  resolve: {
    root: [
      path.join(basedir, './src')
    ]
  }
}
