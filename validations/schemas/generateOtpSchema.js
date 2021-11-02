const Joi = require('joi');

const generateOtpSchema = Joi.object().required().keys({
  mobile: Joi.string(),
});

module.exports = { generateOtpSchema };
