const { checkInSchema } = require('./checkIn');
const { createUserSchema } = require('./createUser');
const { topUpSchema } = require('./topUp');
const { clearPackageSchema } = require('./clearPackage');
const { checkUserMacStatusSchema } = require('./checkUserMacStatus');
const { checkPlaceSubscriptionsSchema } = require('./checkPlaceSubscriptions');
const { generateOtpSchema } = require('./generateOtpSchema');
const { loginSchema } = require('./login');

module.exports = {
  createUserSchema,
  checkInSchema,
  topUpSchema,
  clearPackageSchema,
  checkUserMacStatusSchema,
  checkPlaceSubscriptionsSchema,
  generateOtpSchema,
  loginSchema,
};
