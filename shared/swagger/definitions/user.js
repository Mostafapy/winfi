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

  LoginRequest: {
    title: 'LoginRequest',
    required: ['mobile'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
    },
    example: {
      mobile: '201027494840',
    },
  },
  CheckInRequest: {
    title: 'CheckInRequest',
    required: ['mobile', 'location', 'packageName', 'groupName'],
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
    required: ['mobile', 'location', 'groupName', 'topUpValue'],
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
  IdentifyRequest: {
    title: 'IdentifyRequest',
    required: ['mobile', 'uuid'],
    type: 'object',
    properties: {
      mobile: {
        type: 'string',
      },
      uuid: {
        type: 'string',
      },
    },
  },
};
