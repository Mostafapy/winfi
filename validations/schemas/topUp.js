const Joi = require('joi');

const topUpSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
  packageValue: Joi.string().required(),
});

module.exports = { topUpSchema };
