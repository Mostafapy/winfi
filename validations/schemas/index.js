const { checkInSchema } = require('./checkIn');
const { createUserSchema } = require('./createUser');
const { loginSchema } = require('./login');
const { identifyAppSchema } = require('./identifyApp');
const { topUpSchema } = require('./topUp');
const { clearPackageSchema } = require('./clearPackage');
const { checkUserMacStatusSchema } = require('./checkUserMacStatus');
const { checkPlaceSubscriptionsSchema } = require('./checkPlaceSubscriptions');

module.exports = {
  createUserSchema,
  checkInSchema,
  loginSchema,
  identifyAppSchema,
  topUpSchema,
  clearPackageSchema,
  checkUserMacStatusSchema,
  checkPlaceSubscriptionsSchema,
};
