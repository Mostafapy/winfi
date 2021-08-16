const { checkInSchema } = require('./checkIn');
const { createUserSchema } = require('./createUser');
const { loginSchema } = require('./login');
const { identifyAppSchema } = require('./identifyApp');

module.exports = {
  createUserSchema,
  checkInSchema,
  loginSchema,
  identifyAppSchema,
};
