const joi = require('joi')

module.exports = {
  service: {
    host: joi.string().required(),
    port: joi.number().integer().min(0).max(65535)
  }
}
