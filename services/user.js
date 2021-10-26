/* eslint-disable max-len */
// packages
const moment = require('moment');
// helper functions
const { Logger } = require('../utils/logger');
const {
  md5HashPassword,
  generateNewPassword,
} = require('../helpers/passwords');
const { generateCodesAndOtps } = require('../helpers/codesAndOtps');
const { validateEmail, validateMobile } = require('../validations/validation');
const { searchInDB } = require('./search');
const {
  winficocWinfiDBPromisePool,
  radiusDBPromisePool,
} = require('../config/db');
const { generateMacAddress } = require('../helpers/macAddresses');

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
      return Promise.reject(new Error(`${moduleName},Wrong Email`));
    }

    if (!validateMobile(mobile, countryCode)) {
      return Promise.reject(
        new Error(
          `${moduleName},Wrong Mobile. Mobile must start with your country code`,
        ),
      );
    }

    // Check if user exists
    const user = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `users` where `mobile` = ?',
      [mobile],
    );

    if (user.length > 0) {
      return Promise.reject(new Error(`${moduleName},User already exists`));
    }

    // Map unprovided values in the body of request before save in the DB
    image = image != undefined ? image : null;
    address = address != undefined ? address : null;
    displayName = displayName != undefined ? displayName : null;
    likes = likes != undefined ? likes : null;
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
    const uuid = generateCodesAndOtps();

    const password = generateNewPassword(6);

    const hashedPassword = md5HashPassword(password);

    const verCode = generateCodesAndOtps();

    await winficocWinfiDBPromisePool.query('START TRANSACTION');
    await radiusDBPromisePool.query('START TRANSACTION');

    await winficocWinfiDBPromisePool.execute(
      'insert into  `users` (image, email, country_code, mobile, password, address, first_name, last_name, age, gender, ver_code, display_name, likes, facebook_id, google_id, twitter_id, instagram_id, tripadvisor_id, fb_access_token, tw_access_token, tw_access_token_secret, g_access_token, fsq_token, remember_me, random_code, verified, deleted) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        image,
        email,
        countryCode,
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
        0,
        0,
      ],
    );

    await radiusDBPromisePool.execute(
      'insert  into `radcheck` (username, attribute, op, value) values(?, ?, ?, ?)',
      [mobile, 'MD5-Password', ':=', hashedPassword],
    );

    await winficocWinfiDBPromisePool.query('COMMIT');
    await radiusDBPromisePool.query('COMMIT');

    return Promise.resolve({
      uuid,
    });
  } catch (err) {
    logger.error(err.message, err);
    console.log(err);
    await winficocWinfiDBPromisePool.query('ROLLBACK');
    await radiusDBPromisePool.query('ROLLBACK');
    return Promise.reject(err);
  }
};

/**
 * Service to get check in hours and restriction of user and extend package value
 * @param {Object} body
 * @param {String} body.mobile
 * @param {String} body.location
 * @param {Number} body.topUpValue
 * @returns { Promise | Error }
 */
const topUpService = async ({ mobile, location, topUpValue }) => {
  try {
    // First check if the user exists
    const radiusUserGroup = await searchInDB(
      radiusDBPromisePool,
      'select groupname from `radusergroup` where `username` = ? and `calledstationid` = ?',
      [mobile, location],
    );

    if (radiusUserGroup.length == 0) {
      return Promise.reject(
        new Error(`${moduleName},Radius user group not exists`),
      );
    }

    const group = await searchInDB(
      radiusDBPromisePool,
      'select groupname from `radgroupcheck` where `groupname` = ?',
      [radiusUserGroup[0].groupname],
    );

    if (group.length == 0) {
      return Promise.reject(new Error(`${moduleName},group not exists`));
    }

    let groupValueStr = '';
    let groupUnitStr = '';
    for (let i = 0; i < group[0].groupname.length; i++) {
      if (isNaN(group[0].groupname[i])) {
        groupUnitStr = groupUnitStr + group[0].groupname[i];
      } else {
        groupValueStr = groupValueStr + group[0].groupname[i];
      }
    }
    const valueToExtend = parseInt(groupValueStr) + topUpValue;

    const requiredGroupNameToExtend = valueToExtend.toString() + groupUnitStr;

    const requiredUserGroupToExceed = await searchInDB(
      radiusDBPromisePool,
      'select `groupname` from `radgroupcheck` where `groupname` = ?',
      [requiredGroupNameToExtend],
    );

    if (requiredUserGroupToExceed.length == 0) {
      return Promise.reject(
        new Error(`${moduleName},Required user group to exceed not exists`),
      );
    }

    // Update user group with specified location and restriction

    await radiusDBPromisePool.execute(
      'update `radusergroup` set `groupname` = ?  where `username` = ? and `calledstationid` = ?',
      [requiredUserGroupToExceed[0].groupname, mobile, location],
    );

    // then return this user location
    const data = await searchInDB(
      radiusDBPromisePool,
      'select  * from `radusergroup` where `username` = ? and `calledstationid` = ?',
      [mobile, location],
    );

    return Promise.resolve(data[0]);
  } catch (err) {
    logger.error(err.message, err);
    await radiusDBPromisePool.query('ROLLBACK');
    return Promise.reject(err);
  }
};

/**
 * Service to get check in hours and restriction of user
 * @param {Object} body
 * @param {String} body.mobile
 * @param {String} body.location
 * @param {String} body.groupName
 * @returns { Promise | Error }
 */
const checkInService = async ({ mobile, location, groupName }) => {
  try {
    // First check if the group exists
    const radiusGroup = await searchInDB(
      radiusDBPromisePool,
      'select * from `radgroupcheck` where `groupname` = ?',
      [groupName],
    );

    if (radiusGroup.length == 0) {
      return Promise.reject(
        new Error(`${moduleName},Radius user group not exists`),
      );
    }

    // then return this user location
    const radiusUserGroup = await searchInDB(
      radiusDBPromisePool,
      'select * from `radusergroup` where `username` = ? and `calledstationid` = ?',
      [mobile, location],
    );

    if (radiusUserGroup.length > 0) {
      await radiusDBPromisePool.execute(
        'update `radusergroup` set `groupname` = ?, `calledstationid` = ? where `username` = ?',
        [groupName, location, mobile],
      );
    } else {
      await radiusDBPromisePool.execute(
        'insert into `radusergroup` (`groupname`,`calledstationid`,`username`, `priority`) values(?,?,?,?)',
        [groupName, location, mobile, 0],
      );
    }

    // then return this user location
    const data = await searchInDB(
      radiusDBPromisePool,
      'select  `calledstationid` as location, `username` as mobile, `groupName` as package from `radusergroup` where `username` = ? and `calledstationid` = ?',
      [mobile, location],
    );

    return Promise.resolve(data[0]);
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

/**
  Service to check if user mac status either "Expired", "Unknown", "Valid"
 * @param {Object} body
 * @param {String} body.mac
 * @returns {Promise | Error}
 */

const checkUserMacStatusService = async ({ mac }) => {
  try {
    const response = {};

    const userMac = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `user_macs` where `mac` = ?',
      mac,
    );

    if (userMac.length == 0) {
      response.status = 'Unknown';
    } else if (
      new Date(userMac[0].expiry_date).getTime() < new Date().getTime()
    ) {
      response.status = 'Expired';
    } else {
      const user = await searchInDB(
        winficocWinfiDBPromisePool,
        'select * from `users` where `id` = ?',
        [userMac[0].user_id],
      );
      response.status = 'Valid';
      response.user = JSON.parse(JSON.stringify(user[0]));
      response.mac = mac;
    }

    return Promise.resolve(response);
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

/**
  Service to check if choosed place or location is subscriped
 * @param {Object} body
 * @param {String} body.serverName
 * @returns {Promise | Error}
 */
const checkPlaceSubscriptionsService = async ({ serverName }) => {
  try {
    const place = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `places` where `hotspot_server` = ?',
      serverName,
    );

    return Promise.resolve(place);
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

/**
 * Service to generate 6-digits OTP and add it to user
 * @param {String} body.mobile
 * @returns { Promise | }
 */
const generateOtpService = async ({ mobile }) => {
  try {
    const user = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `users` where `mobile` = ?',
      [mobile],
    );

    if (user.length == 0) {
      return Promise.reject(
        new Error(`This mobile ${mobile} is not registered.`),
      );
    }

    const otp = generateCodesAndOtps();

    await winficocWinfiDBPromisePool.execute(
      'update `users` set `random_code` = ? where `mobile` = ?',
      [otp, mobile],
    );

    return Promise.resolve(otp);
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

/**
 * Service to login to the app and generate mac address
 * @param {String} body.otp
 * @param {String} body.browser
 * @param {String} body.browserVersion
 * @returns {Promise | Error}
 */
const loginService = async ({ otp, browser, browserVersion }) => {
  try {
    const user = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `users` where `random_code` = ?',
      [otp],
    );

    if (user.length == 0) {
      return Promise.reject('Wrong otp');
    }

    const newMac = generateMacAddress();

    const currentDate = moment(new Date());

    // Generate new expiry date after 6 months
    const expiryDate = moment(currentDate).add(6, 'M');

    const userMac = await searchInDB(
      winficocWinfiDBPromisePool,
      'select * from `user_macs` where `user_id` = ?',
      user[0].id,
    );

    if (userMac.length == 0) {
      await winficocWinfiDBPromisePool.execute(
        'insert into `user_macs` (`user_id`,`mac`,`date_added`, `expiry_date`, `browser`, `browser_version`) values(?,?,?,?,?,?)',
        [
          user[0].id,
          newMac,
          currentDate.toDate(),
          expiryDate.toDate(),
          browser,
          browserVersion,
        ],
      );
    } else {
      await winficocWinfiDBPromisePool.execute(
        'update`user_macs` set `expiry_date` = ?, `browser` = ?, `browser_version` = ? where `user_id` = ? and `mac` = ?',
        [
          expiryDate.toDate(),
          browser,
          browserVersion,
          user[0].id,
          userMac[0].mac,
        ],
      );
    }

    await winficocWinfiDBPromisePool.execute(
      'update `users` set `random_code` = NULL where `random_code` = ?',
      [otp],
    );

    return Promise.resolve();
  } catch (err) {
    logger.error(err.message, err);
    return Promise.reject(err);
  }
};

module.exports = {
  createUserService,
  checkInService,
  topUpService,
  checkUserMacStatusService,
  checkPlaceSubscriptionsService,
  generateOtpService,
  loginService,
};
