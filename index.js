'use strict'

const path = require('path')
const fs = require('fs')

const handlebars = require('handlebars')

const bundledir = path.join(__dirname, './build/bundle')
const dirBundles = fs.readdirSync(bundledir)

const bundlesNeeded = [
  'main'
]

const bundles = {}

const templatedir = path.join(__dirname, 'src/html')

const templatesNeeded = [
  'main'
]

const templates = {}

// Map the bundles.
for (let filename of dirBundles) {
  const regexed = /^(.*?)-.*?\.js$/.exec(filename)
  if (!regexed) continue
  const basename = regexed[1]
  if (bundles[basename]) throw new Error(`Found duplicate bundle bundles: ${basename} (${filename})`)
  if (bundlesNeeded.indexOf(basename) === -1) throw new Error(`Unknown bundle file: ${basename} (${filename})`)
  bundles[basename] = filename
}

// Make sure all of them are there.
for (let fileNeeded of bundlesNeeded) {
  if (!bundles[fileNeeded]) throw new Error(`Missing bundle: ${fileNeeded}`)
}

// Load the templates.
for (let templateNeeded of templatesNeeded) {
  const templateFile = fs.readFileSync(path.join(templatedir, `${templateNeeded}.hbs`), 'utf-8')
  templates[templateNeeded] = handlebars.compile(templateFile)
}

module.exports = {
  bundles: bundles,
  bundleDir: bundledir,
  templates: templates,
  publicPath: '/s/'
}
