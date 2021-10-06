const Joi = require('joi');

const checkUserMacStatusSchema = Joi.object().required().keys({
  mac: Joi.string().required(),
});

module.exports = { checkUserMacStatusSchema };
