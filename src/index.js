import joi from 'joi'
import mpath from 'mpath'

import { merge, isString, isFunction } from 'lodash'
import { build, toObject } from './loader'

/**
 * General error message
 */
const message = 'gPlatform Settings - Schema Validation Error:'

/**
 * Exits on error function.
 */
export function exitOnError(title = null, code = 1, verbose = false) {
  return (err, value) => {
    const {error} = console
    error(title)

    if (verbose) {
      error('')
      error(err.stack.toString())
    }

    err.details.forEach(({type, message, path}) => {
      error('')
      error('  Type:', type)
      error('  Message:', message)
      error('  Path:', path)
      error('')
    })
    process.exit(code)
  }
}

/**
 * Loads and merge the settings.
 * @param {object} options - settings options.
 * @returns {object} settings, get and schema fields.
 */
export function load({defaults, variables, schema, separator, regex, json, buildValue, exit}) {
  const objectDefaults = isString(defaults) ? toObject(defaults, json) : defaults
  let settings = merge(objectDefaults, build(variables, separator, regex, buildValue))

  if (schema) {
    const {error, value} = joi.validate(settings, schema, {convert: true, presence: 'required'})
    settings = value
    if (error) { 
      (isFunction(exit) ? exit : exitOnError(message))(error, value)
    }
  }

  const get = (path, special, map) => mpath.get(path, settings, special, map)
  return {settings, get, schema}
}
