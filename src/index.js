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
