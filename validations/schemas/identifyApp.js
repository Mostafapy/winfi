const Joi = require('joi');

const identifyAppSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  uuid: Joi.string().required(),
});

module.exports = { identifyAppSchema };
