const { checkInSchema } = require('./checkIn');
const { createUserSchema } = require('./createUser');
const { loginSchema } = require('./login');

module.exports = {
  createUserSchema,
  checkInSchema,
  loginSchema,
};
