// const { load } = require('@gplatform/settings')
const { load } = require('../../dist')

const defaults = require('./settings.json')
const schema = require('./schema.js')
const appName = 'MY_APP_PREFIX'

module.exports = load({
  defaults,
  schema, // Joi Schema - Optional
  commandLineInterface: true, // Experimental
  app: process.env[appName],
  variables: process.env,
  regex: new RegExp('^' + appName + '_')
})
