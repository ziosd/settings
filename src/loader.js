/**
 * Builds settings from variables object.
 * @param {object} variables - object variables.
 * @param {string} separator - fields object separator.
 * @param {regex} regex - filter for variables.
 * @param {function} buildValue - build value from string.
 */
export function build(variables, separator = '_', regex = /^GPLATFORM_SETTINGS_/, buildValue = defaultBuildValue) {
  const filteredVariables = processSettings(variables, regex, buildValue)
  return buildSettings(filteredVariables, separator)
}

/**
 * Bulds an objet from string settings.
 * @param {string} defaults - file path or json string.
 * @param {boolean} json - true if defaults is json.
 */
export function toObject(defaults, json) {
  return json ? JSON.parse(defaults) : require(defaults)
}

const json = /^(\[|\{).*(\]|\})$/

export function defaultBuildValue(value) {
  return json.test((value || '').trim()) ? JSON.parse(value) : value
}

export function processSettings(variables, regex = /^GPLATFORM_SETTINGS_/, buildValue = defaultBuildValue) {
  const result = {}
  for (const key in variables) {
    if (regex.test(key)) {
      result[key.replace(regex, '')] = buildValue(variables[key])
    }
  }
  return result
}


/**
 * Builds an object using separators for nested fields.
 * @param {object} variables - list of varibles.
 */
export function buildSettings(variables, separator = '_') {
  const settings = {}
  for (const key in variables) {
    const value = variables[key]
    const fields = key.split(separator)

    let base = settings
    let last = null
    let field = null
    for (field of fields) {
      last = base
      base[field] = base[field] || {}
      base = base[field]
    }

    last[field] = value
  }

  return settings
}
