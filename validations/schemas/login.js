const Joi = require('joi');

const loginSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
});

module.exports = { loginSchema };
