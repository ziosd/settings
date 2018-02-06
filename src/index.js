import { merge, isString } from 'lodash'
import { build, toObject } from './loader'

/**
 * Loads and merge the settings.
 * @param {object} options - settings options. 
 */
export function load({defaults, variables, separator, regex, buildValue, json}) {
  const objectDefaults = isString(defaults) ? toObject(defaults, json) : defaults
  return merge(objectDefaults, build(variables, separator, regex, buildValue))
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
