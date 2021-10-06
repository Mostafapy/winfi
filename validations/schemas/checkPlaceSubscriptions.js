const Joi = require('joi');

const checkPlaceSubscriptionsSchema = Joi.object().required().keys({
  serverName: Joi.string().required(),
});

module.exports = { checkPlaceSubscriptionsSchema };
