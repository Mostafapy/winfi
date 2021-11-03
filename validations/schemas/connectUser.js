const Joi = require('joi');

const connectUserSchema = Joi.object().required().keys({
  mac: Joi.string().required(),
});

module.exports = { connectUserSchema };
