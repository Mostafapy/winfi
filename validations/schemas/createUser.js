const Joi = require('joi');

const createUserSchema = Joi.object()
  .required()
  .keys({
    image: Joi.string(),
    mobile: Joi.string().required(),
    email: Joi.string().email().required(),
    countryCode: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    address: Joi.string(),
    age: Joi.date().required(),
    displayName: Joi.string(),
    likes: Joi.string(),
    gender: Joi.any().not(null).valid('male', 'female').required(),
    facebookId: Joi.string(),
    googleId: Joi.string(),
    twitterId: Joi.string(),
    instagramId: Joi.string(),
    tripadvisorId: Joi.string(),
    fbAccessToken: Joi.string(),
    twAccessAoken: Joi.string(),
    twAccessTokenSecret: Joi.string(),
    gAccessToken: Joi.string(),
    fsqToken: Joi.string(),
    rememberMe: Joi.string(),
    randomCode: Joi.string(),
  });

module.exports = { createUserSchema };
