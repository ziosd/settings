const joi = require('joi')

module.exports = {
  name: joi.string().min(3).max(30).required(),
  server: {
    host: joi.string().required(),
    port: joi.number().integer().min(0).max(65535)
  },
  mongo: {
    uri: joi.string().required()
  }
}
