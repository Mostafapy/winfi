const express = require('express');

const { requestValidation } = require('../middleware/requestValidation');

const schemas = require('../validations/schemas');

/** Controllers */
const { createUser, checkIn, login } = require('../controllers/user');

const apiRoutes = express.Router();

apiRoutes.post(
  '/create',
  requestValidation(schemas.createUserSchema),
  createUser,
);

apiRoutes.put('/checkIn', requestValidation(schemas.checkInSchema), checkIn);

apiRoutes.post('/login', requestValidation(schemas.loginSchema), login);

module.exports = apiRoutes;
