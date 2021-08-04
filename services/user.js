/* eslint-disable max-len */
// helper functions
const { Logger } = require('../utils/logger');
const passwordsHelpers = require('../helpers/passwords');
const codesAndOtpsHelpers = require('../helpers/codesAndOtps');
const macAddressHelpers = require('../helpers/macAddresses');
const { validateEmail, validateMobile } = require('../validations/validation');
const { searchInDB } = require('./search');
const {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
} = require('../config/db');

// Intialize logger
const moduleName = 'User Module';
const logger = new Logger(moduleName);
/**
 * Create user service
 * @param {Object} body
 * @param {String} body.image
 * @param {String} body.email
 * @param {String} body.mobile
 * @param {String} body.countryCode
 * @param {String} body.firstName
 * @param {String} body.lastName
 * @param {String} body.address
 * @param { Date } body.age
 * @param {String} body.gender
 * @param {String} body.displayName
 * @param {String} body.likes
 * @param {String} body.password
 * @param {String} body.facebookId
 * @param {String} body.googleId
 * @param {String} body.twitterId
 * @param {String} body.instagramId
 * @param {String} body.tripadvisorId
 * @param {String} body.fbAccessToken
 * @param {String} body.twAccessToken
 * @param {String} body.twAccessTokenSecret
 * @param {String} body.gAccessToken
 * @param {String} body.fsqToken
 * @param {String} body.rememberMe
 * @param {String} body.randomCode
 * @returns { Promise | Error }
 */
const createUserService = async ({
  image,
  email,
  mobile,
  countryCode,
  firstName,
  lastName,
  address,
  age,
  gender,
  displayName,
  likes,
  password,
  facebookId,
  googleId,
  twitterId,
  instagramId,
  tripadvisorId,
  fbAccessToken,
  twAccessToken,
  twAccessTokenSecret,
  gAccessToken,
  fsqToken,
  rememberMe,
  randomCode,
}) => {
  try {
    // First validation of the mobile and email
    if (!validateEmail(email)) {
      return Promise.reject(new Error(`${moduleName} wrong email`));
    }

    if (!validateMobile(mobile, countryCode)) {
      return Promise.reject(new Error(`${moduleName} wrong mobile`));
    }

    // Check if user exists
    const user = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `users` where `mobile` = ?',
      [mobile],
    );

    if (user.length > 0) {
      return Promise.reject(new Error(`${moduleName} User already exists`));
    }

    // Map unprovided values in the body of request before save in the DB
    image = image != undefined ? image : null;
    lastName = lastName != undefined ? lastName : null;
    address = address != undefined ? address : null;
    displayName = displayName != undefined ? displayName : null;
    facebookId = facebookId != undefined ? facebookId : null;
    googleId = googleId != undefined ? googleId : null;
    twitterId = twitterId != undefined ? twitterId : null;
    instagramId = instagramId != undefined ? instagramId : null;
    tripadvisorId = tripadvisorId != undefined ? tripadvisorId : null;
    fbAccessToken = fbAccessToken != undefined ? fbAccessToken : null;
    twAccessToken = twAccessToken != undefined ? twAccessToken : null;
    gAccessToken = gAccessToken != undefined ? gAccessToken : null;
    fsqToken = fsqToken != undefined ? fsqToken : null;
    twAccessTokenSecret =
      twAccessTokenSecret != undefined ? twAccessTokenSecret : null;
    rememberMe = rememberMe != undefined ? rememberMe : null;
    randomCode = randomCode != undefined ? randomCode : null;

    // hashPassword
    const hashedPassword = passwordsHelpers.md5HashPassword(password);

    const verCode = codesAndOtpsHelpers.generateCodesAndOtps();

    const addedUser = await winficocWinfiDBPromisePool.execute(
      'insert into  `users` (image, email, mobile, password, address, first_name, last_name, age, gender, ver_code, display_name, likes, facebook_id, google_id, twitter_id, instagram_id, tripadvisor_id, fb_access_token, tw_access_token, tw_access_token_secret, g_access_token, fsq_token, remember_me, random_code) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        image,
        email,
        mobile,
        hashedPassword,
        address,
        firstName,
        lastName,
        age,
        gender,
        verCode,
        displayName,
        likes,
        facebookId,
        googleId,
        twitterId,
        instagramId,
        tripadvisorId,
        fbAccessToken,
        twAccessToken,
        twAccessTokenSecret,
        gAccessToken,
        fsqToken,
        rememberMe,
        randomCode,
      ],
    );

    await radiusDBPromisePool.execute(
      'insert  into `radcheck` (username, attribute, op, value) values(?, ?, ?, ?, ?)',
      [mobile, 'MD5-Password', ':=', hashedPassword],
    );

    return Promise.resolve(addedUser);
  } catch (err) {
    logger.error(err.message, err);
    err.message = `${moduleName} ${err.message}`;
    return Promise.reject(err);
  }
};

/**
 * Service to get check in hours and restriction of user
 * @param {Object} body
 * @param {String} body.mobile
 * @param {String} body.location
 * @returns { Promise | Error }
 */
const checkInService = async ({ mobile, location /*restrictions*/ }) => {
  try {
    // First check if the user exists
    const radiusUserGroup = await searchInDB(
      radiusDBPromisePool,
      'select * from `radusergroup` where `username` = ?',
      [mobile],
    );

    if (radiusUserGroup.length == 0) {
      return Promise.reject(new Error(`${moduleName} user not exists`));
    }

    // Update user group with specified location and restriction
    await radiusDBPromisePool.execute(
      'update `radusergroup` set `groupname` = ? where `username` = ? AND `calledstationid` = ?',
      [mobile, location],
    );

    // then return this user location
    const data = await radiusDBPromisePool.execute(
      'select  `calledstationid` as location, `username` as mobile from `radusergroup` where `username` = ? AND `calledstationid` = ?',
      [mobile, location],
    );

    return Promise.resolve(data[0]);
  } catch (err) {
    logger.error(err.message, err);
    err.message = `${moduleName} ${err.message}`;
    return Promise.reject(err);
  }
};

/**
 * Service to login user and get mac address
 * @param {Object} body
 * @param {String} body.mobile
 * @returns {Promise | Error}
 */
const loginService = async ({ mobile }) => {
  try {
    const user = await searchInDB(
      winficocWinfiDBPromisePool,
      'select id from `users` where `mobile` = ?',
      [mobile],
    );

    if (user.length == 0) {
      return Promise.reject(new Error(`${moduleName} user not exists`));
    }

    const userMacs = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `user_macs` where `user_id` = ?',
      user[0].id,
    );

    if (userMacs.length == 0) {
      return Promise.resolve({
        OTP: codesAndOtpsHelpers.generateCodesAndOtps(),
      });
    }
    // check the expiry of the mac address
    const currentDate = new Date();

    if (new Date(userMacs[0].expiry_date).getTime() < currentDate.getTime()) {
      // Generate new mac address
      const newMac = macAddressHelpers.generateMacAddress();
      // Generate new expiry date after 6 months
      const expiryDate = new Date(
        currentDate.setMonth(currentDate.getMonth() + 6),
      );
      await winficocWinfiDBPromisePool.execute(
        'update `user_macs` set `mac` = ? `start_date` = ? expiry_date = ? where `user_id` = ?',
        [newMac, currentDate, expiryDate, user[0].id],
      );

      return Promise.resolve({
        mac: newMac,
      });
    }
  } catch (err) {
    logger.error(err.message, err);
    err.message = `${moduleName} ${err.message}`;
    return Promise.reject(err);
  }
};

module.exports = { createUserService, checkInService, loginService };
