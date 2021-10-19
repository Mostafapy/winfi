const Joi = require('joi');

const loginSchema = Joi.object().required().keys({
  otp: Joi.string().required(),
  browser: Joi.string().required(),
  browserVersion: Joi.string().required(),
});

module.exports = { loginSchema };
