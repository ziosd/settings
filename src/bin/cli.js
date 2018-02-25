#!/usr/bin/env node

import fs from 'fs'
import path from 'path'

function template(name) {
  return `\
const { load } = require('@gplatform/settings')

const defaults = require('./settings.json')
const schema = require('./schema.js')
const appName = '${name}'

module.exports = load({
  defaults,
  schema,
  commandLineInterface: true,
  app: process.env[appName],
  variables: process.env,
  regex: new RegExp('^' + appName + '_')
})
`
}

const actions = {
  /**
   * Creates folder structure.
   */
  init(name) {
    console.log('@gPlatgotm/Settings Init')

    fs.mkdirSync('./settings')
    fs.writeFileSync('./settings/index.js', template(name || 'GPLATFORM_SETTINGS'))
    fs.copyFileSync(path.resolve(__dirname, '../../template/schema.js'), './settings/schema.js')
    fs.copyFileSync(path.resolve(__dirname, '../../template/settings.json'), './settings/settings.json')

    console.log('Success')
  },

  /**
   * Builds env variable.
   */
  build(name) {
    const data = fs.readFileSync(name || './settings/settings.json')
    const value = JSON.stringify(JSON.parse(data))

    console.log('@gPlatgotm/Settings Build')
    console.log(`\nGPLATFORM_SETTINGS='${value}'\n`)
    console.log('Success')
  },

  /**
   * Creates content for env file
   */
  env() {
    const data = fs.readFileSync(name || './settings/settings.json')
    const value = JSON.stringify(JSON.parse(data))

    console.log('# @gPlatgotm/Settings - Production')
    console.log(`# Last Update: ${new Date().toISOString()}`)
    console.log(`\nGPLATFORM_SETTINGS='${value}'\n`)
  }
}

const alias = {
  'i': 'init', 'init': 'init', '-i': 'init', '--init': 'init',
  'b': 'build', 'build': 'build', '-b': 'build', '--build': 'build',
  'e': 'env', 'env': 'env', '-e': 'env', '--env': 'env',
}

// executes user action
const [ , , command, name] = process.argv
actions[alias[command || 'init']](name)
