// const { load } = require('@gplatform/settings')
const { load } = require('../../dist')

const defaults = require('./settings.json')
const schema = require('./schema.js')

module.exports = load({
  defaults,
  schema, // optional
  variables: process.env,
  regex: /^MY_APP_PREFIX_/
})

// CLI Generator - gp new settings 
