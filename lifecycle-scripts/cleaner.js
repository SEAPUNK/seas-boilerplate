'use strict'

const path = require('path')

const maybestack = require('maybestack')
const Promise = require('bluebird')
const exit = require('exit')
const _rimraf = require('rimraf')
const _mkdirp = require('mkdirp')

const rimraf = Promise.promisify(_rimraf)
const mkdirp = Promise.promisify(_mkdirp)

const basedir = path.join(__dirname, '../')

function cleanBuild () {
  const bundleDir = path.join(basedir, './build/bundle')
  return Promise.resolve().then(() => {
    return rimraf(bundleDir)
  }).then(() => {
    return mkdirp(bundleDir)
  })
}

function cleanDevel () {
  const templateDir = path.join(basedir, './build/devel')
  return Promise.resolve().then(() => {
    return rimraf(templateDir)
  }).then(() => {
    return mkdirp(templateDir)
  })
}

exports.cleanBuild = cleanBuild
exports.cleanDevel = cleanDevel

if (require.main === module) {
  Promise.resolve().then(() => {
    console.log('Cleaning bundle directory')
    return cleanBuild()
  }).then(() => {
    console.log('Cleaning development environment')
    return cleanDevel()
  }).catch((err) => {
    console.log(maybestack(err))
    exit(1)
  })
}
