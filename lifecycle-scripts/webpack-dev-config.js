'use strict'

const path = require('path')

const merge = require('lodash.merge')

const common = require('./common')

module.exports = merge(common.webpack, {
  entry: {
    main: './src/entry/main.dev.js'
  },
  output: {
    path: path.join(__dirname, '../build/devel'),
    filename: '[name].js'
  },
  devServer: {
    proxy: {
      '/_/*': {
        target: 'http://localhost:37001',
        secure: false,
        ws: true
      }
    }
  }
})
