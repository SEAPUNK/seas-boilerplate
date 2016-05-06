'use strict'

const path = require('path')
const fs = require('fs')

const handlebars = require('handlebars')
const Promise = require('bluebird')
const maybestack = require('maybestack')
const exit = require('exit')

const cleaner = require('./cleaner')

const basedir = path.join(__dirname, '../')
const templatedir = path.join(basedir, './src/html')
const outdir = path.join(basedir, './build/devel')

function compileTemplates () {
  return Promise.resolve().then(() => {
    const mainFile = fs.readFileSync(path.join(templatedir, 'main.hbs'), 'utf-8')
    const main = handlebars.compile(mainFile)

    fs.writeFileSync(path.join(outdir, 'index.html'), main({
      mainScript: '/s/main.js'
    }))
  })
}

Promise.resolve().then(() => {
  console.log('Cleaning development environment')
  return cleaner.cleanDevel()
}).then(() => {
  return compileTemplates()
}).catch((err) => {
  console.log(maybestack(err))
  exit(1)
})
