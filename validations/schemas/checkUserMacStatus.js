const Joi = require('joi');

const checkUserMacStatusSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
});

module.exports = { checkUserMacStatusSchema };
