const Joi = require('joi');

const generateOtpSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
});

module.exports = { generateOtpSchema };
