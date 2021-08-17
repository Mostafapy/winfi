const Joi = require('joi');

const checkInSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
  packageName: Joi.string().required(),
  packageValue: Joi.string().required(),
});

module.exports = { checkInSchema };
