'use strict'

const webpack = require('webpack')
const maybestack = require('maybestack')
const Promise = require('bluebird')
const merge = require('lodash.merge')
const exit = require('exit')

const common = require('./common')
const cleaner = require('./cleaner')

function runWebpackBuild (config) {
  return new Promise((resolve, reject) => {
    function rejectBuild (stats, error) {
      console.log(stats.toString({
        colors: true
      }))
      reject(error)
    }

    function resolveBuild (stats) {
      console.log(stats.toString({
        colors: true,
        chunks: false
      }))
      resolve()
    }

    webpack(config, (err, stats) => {
      if (err) return reject(err)
      if (stats.hasErrors()) return rejectBuild(stats, new Error('Build had errors'))
      resolveBuild(stats)
    })
  })
}

const webpackConfig = merge(common.webpack, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
})

Promise.resolve().then(() => {
  console.log('Cleaning build directory')
  return cleaner.cleanBuild()
}).then(() => {
  console.log('Running build')
  return runWebpackBuild(webpackConfig)
}).catch((err) => {
  console.log(maybestack(err))
  exit(1)
})
