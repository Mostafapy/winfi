const Joi = require('joi');

const checkInSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
  restrictions: Joi.any(),
});

module.exports = { checkInSchema };
