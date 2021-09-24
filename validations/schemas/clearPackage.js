const Joi = require('joi');

const clearPackageSchema = Joi.object().required().keys({
  mobile: Joi.string().required(),
  location: Joi.string().required(),
});

module.exports = { clearPackageSchema };
