module.exports = {
  CreateUserRequest: {
    title: 'CreateUserRequest',
    required: [
      'countryCode',
      'mobile',
      'email',
      'gender',
      'firstName',
      'lastName',
      'age',
    ],
    type: 'object',
    properties: {
      image: {
        type: 'string',
      },
      mobile: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      countryCode: {
        type: 'string',
      },
      firstName: {
        type: 'string',
      },
      lastName: {
        type: 'string',
      },
      address: {
        type: 'string',
      },
      age: {
        type: 'date',
      },
      displayName: {
        type: 'string',
      },
      likes: {
        type: 'string',
      },
      rememberMe: {
        type: 'string',
      },
      randomCode: {
        type: 'string',
      },
      fsqToken: {
        type: 'string',
      },
      facebookId: {
        type: 'string',
      },
      googleId: {
        type: 'string',
      },
      twitterId: {
        type: 'string',
      },
      instagramId: {
        type: 'string',
      },
      tripadvisorId: {
        type: 'string',
      },
      fbAccessToken: {
        type: 'string',
      },
      twAccessAoken: {
        type: 'string',
      },
      twAccessTokenSecret: {
        type: 'string',
      },
      gAccessToken: {
        type: 'string',
      },
      gender: {
        type: 'string',
        description: 'Must be either male or female',
      },
    },
  },

  CheckUserMacStatusRequest: {
    title: 'CheckUserMacStatusRequest',
    required: ['mobile', 'password'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  GenerateOtpRequest: {
    title: 'GenerateOtpRequest',
    required: ['mobile'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
    },
  },
  LoginRequest: {
    title: 'LoginRequest',
    required: ['otp'],
    type: 'object',
    properties: {
      otp: {
        type: 'string',
      },
    },
    example: {
      otp: '494840',
    },
  },
  CheckInRequest: {
    title: 'CheckInRequest',
    required: ['mobile', 'location', 'groupName'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
      groupName: {
        type: 'string',
      },
    },
  },
  TopUpRequest: {
    title: 'TopUpRequest',
    required: ['mobile', 'location', 'topUpValue'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
      groupName: {
        type: 'string',
      },
      topUpValue: {
        type: 'number',
      },
    },
  },
  ClearPackageRequest: {
    title: 'ClearPackageRequest',
    required: ['mobile', 'location'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
      location: {
        type: 'string',
      },
    },
  },
};
