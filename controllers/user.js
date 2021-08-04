const { createUserService, checkInService } = require('../services/user');
const { asyncHandler } = require('../middleware/asyncHandler');
const { ErrorResponse } = require('../utils/errorResponse');

/**
 * @ [DESC]: Create User Controller
 * @method POST
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const createUser = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const createdUser = await createUserService(body);

    return res.status(201).json({
      success: true,
      msg: 'Successfully user is created',
      data: createdUser,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Check inController
 * @method PUT
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const checkIn = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const user = await checkInService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully retrieved User data',
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Login inController
 * @method PUT
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const login = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const user = await checkInService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully retrieved User data',
      data: user,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});
module.exports = { createUser, checkIn, login };
