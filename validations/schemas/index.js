const { checkInSchema } = require('./checkIn');
const { createUserSchema } = require('./createUser');
const { loginSchema } = require('./login');
const { identifyAppSchema } = require('./identifyApp');
const { topUpSchema } = require('./topUp');

module.exports = {
  createUserSchema,
  checkInSchema,
  loginSchema,
  identifyAppSchema,
  topUpSchema,
};
