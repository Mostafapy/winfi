const {
  createUserService,
  checkInService,
  identifyAppService,
  topUpService,
} = require('../services/user');
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
      data: { user: createdUser },
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Check in Controller
 * @method POST
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
      msg: 'Successfully retrieved User Group data',
      data: { user },
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Top uo Controller
 * @method POST
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const topUp = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const user = await topUpService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully retrieved User Group data',
      data: { user },
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Identify App Controller
 * @method POST
 * @param req
 * @param res
 * @returns { Promise | Error}
 */
const identifyApp = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const data = await identifyAppService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully logged in',
      data,
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
    const data = await checkInService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully retrieved User data',
      data: data,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Clear Package Controller
 * @method DELETE
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const clearPackage = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const checkInObj = {
      ...body,
      groupName: '0h',
    };

    await checkIn(checkInObj);

    return res.status(200).json({
      success: true,
      msg: `Successfully Cleared package on location ${body.location}`,
      data: null,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

module.exports = {
  createUser,
  checkIn,
  login,
  identifyApp,
  topUp,
  clearPackage,
};
