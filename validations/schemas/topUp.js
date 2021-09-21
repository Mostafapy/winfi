const Joi = require('joi');

const topUpSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
  topUpValue: Joi.number().required(),
});

module.exports = { topUpSchema };
