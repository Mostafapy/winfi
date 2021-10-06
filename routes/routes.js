const express = require('express');

const { requestValidation } = require('../middleware/requestValidation');

const schemas = require('../validations/schemas');

/** Controllers */
const {
  createUser,
  checkIn,
  checkUserMacStatus,
  topUp,
  clearPackage,
  generateOtp,
  login,
} = require('../controllers/user');

const apiRoutes = express.Router();

apiRoutes.post(
  '/register',
  requestValidation(schemas.createUserSchema),
  createUser,
);

apiRoutes.post('/checkIn', requestValidation(schemas.checkInSchema), checkIn);

apiRoutes.post('/topUp', requestValidation(schemas.topUpSchema), topUp);

apiRoutes.get(
  '/checkUserMacStatus',
  requestValidation(schemas.checkUserMacStatusSchema),
  checkUserMacStatus,
);

apiRoutes.delete(
  '/clearPackage',
  requestValidation(schemas.clearPackageSchema),
  clearPackage,
);

apiRoutes.post(
  '/generateOtp',
  requestValidation(schemas.generateOtpSchema),
  generateOtp,
);

apiRoutes.post('/login', requestValidation(schemas.loginSchema), login);

module.exports = apiRoutes;
