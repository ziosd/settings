'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = load;

var _lodash = require('lodash');

var _loader = require('./loader');

/**
 * Loads and merge the settings.
 * @param {object} options - settings options.
 */
function load(_ref) {
  var defaults = _ref.defaults,
      variables = _ref.variables,
      separator = _ref.separator,
      regex = _ref.regex,
      buildValue = _ref.buildValue,
      json = _ref.json;

  var objectDefaults = (0, _lodash.isString)(defaults) ? (0, _loader.toObject)(defaults, json) : defaults;
  return (0, _lodash.merge)(objectDefaults, (0, _loader.build)(variables, separator, regex, buildValue));
}

//
// import { load } from '@gplatform/settings'

// const defaults = {
//   appName: 'something',
//   version: 'Test'
// }

// const options = {
//   file: 'settings.json' | { object } | settings
//   base: asd || 'PRODUCTION_SETTINGS_'
// }

// module.exports = load(options)


// import { appName } from './settings'