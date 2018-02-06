const { load } = require('../../dist') 

const defaults = {
  name: 'Gary Ascuy Anturiano',
  db: {
    host: 'localhost',
    port: 27017
  }
}

/** for productions it should be process.env */
const variables = {
  PATH: 'other',
  ANDROID_HOME: 'home',
  GPLATFORM_SETTINGS_name: 'gary',
  GPLATFORM_SETTINGS_db_port: '3666',
  GPLATFORM_SETTINGS_db_host: 'localhost'
}

module.exports = load({defaults, variables})
