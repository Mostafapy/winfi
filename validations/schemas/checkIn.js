const Joi = require('joi');

const checkInSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
  groupName: Joi.string().required(),
});

module.exports = { checkInSchema };
