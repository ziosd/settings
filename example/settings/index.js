// const { load } = require('@gplatform/settings')
const { load } = require('../../dist')

const defaults = require('./settings.json')
const schema = require('./schema.js')

module.exports = load({
  defaults,
  schema, // Joi Schema - Optional
  variables: process.env,
  regex: /^MY_APP_PREFIX_/
})
