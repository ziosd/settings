const { load } = require('../../../dist') // const { load } = require('@gplatform/setttings')
const defaults = require('./settings.json')

module.exports = load({defaults, variables: process.env, regex: /^MY_APP_PREFIX_/})
