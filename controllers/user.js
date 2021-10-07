const {
  createUserService,
  checkInService,
  topUpService,
  checkUserMacStatusService,
  generateOtpService,
  loginService,
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
 * @ [DESC]: check user mac status Controller
 * @method GET
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const checkUserMacStatus = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;
    const data = await checkUserMacStatusService(body);

    return res.status(200).json({
      success: true,
      msg: 'Mac Address Status retrieved successfully',
      data,
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

    await checkInService(checkInObj);

    return res.status(200).json({
      success: true,
      msg: `Successfully Cleared package on location ${body.location}`,
      data: null,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Generate OTP Controller
 * @method POST
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const generateOtp = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;

    const data = await generateOtpService(body);

    return res.status(200).json({
      success: true,
      msg: `Successfully generate an OTP for mobile ${body.mobile}.`,
      data,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

/**
 * @ [DESC]: Login Controller
 * @method POST
 * @param req
 * @param res
 * @returns { Promise | Error}
 */

const login = asyncHandler(async (req, res, next) => {
  try {
    const { body } = req;

    await loginService(body);

    return res.status(200).json({
      success: true,
      msg: 'Successfully logged in',
      data: null,
    });
  } catch (err) {
    next(new ErrorResponse(err.message, err.stack));
  }
});

module.exports = {
  createUser,
  checkIn,
  checkUserMacStatus,
  topUp,
  clearPackage,
  generateOtp,
  login,
};
