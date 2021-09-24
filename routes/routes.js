const express = require('express');

const { requestValidation } = require('../middleware/requestValidation');

const schemas = require('../validations/schemas');

/** Controllers */
const {
  createUser,
  checkIn,
  login,
  identifyApp,
  topUp,
  clearPackage,
} = require('../controllers/user');

const apiRoutes = express.Router();

apiRoutes.post(
  '/register',
  requestValidation(schemas.createUserSchema),
  createUser,
);

apiRoutes.post(
  '/identify',
  requestValidation(schemas.identifyAppSchema),
  identifyApp,
);
apiRoutes.post('/checkIn', requestValidation(schemas.checkInSchema), checkIn);

apiRoutes.post('/topUp', requestValidation(schemas.topUpSchema), topUp);

apiRoutes.post('/login', requestValidation(schemas.loginSchema), login);

apiRoutes.delete(
  '/clearPackage',
  requestValidation(schemas.clearPackageSchema),
  clearPackage,
);

module.exports = apiRoutes;
