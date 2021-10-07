module.exports = {
  '/user/register': {
    post: {
      tags: ['User'],
      summary: 'Create User',
      operationId: 'Create User',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequest',
            },
          },
        },
        required: true,
      },
      responses: {
        201: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Successfully user is created',
                  data: {
                    uuid: 'string',
                    mobile: 'string',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/checkIn': {
    post: {
      tags: ['User'],
      summary: 'Check User Details',
      operationId: 'CheckIn',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CheckInRequestSchema',
            },
            example: {
              mobile: '201027494877',
              location: 'location',
              groupName: 'group 1',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Successfully retrieved User Group data',
                  data: {
                    user: 'object',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/topUp': {
    post: {
      tags: ['User'],
      summary: 'Top User Group Package Value',
      operationId: 'TopUp',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/TopUpRequestSchema',
            },
            example: {
              mobile: '201027494877',
              location: 'location',
              topUpValue: 5,
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Successfully retrieved User Group data',
                  data: {
                    user: 'object',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/login': {
    post: {
      tags: ['User'],
      summary: 'User Login',
      operationId: 'Login',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginpRequest',
            },
            example: {
              otp: '494877',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Successfully logged in',
                  data: null,
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/clearPackage': {
    delete: {
      tags: ['User'],
      summary: 'Check User Details',
      operationId: 'ClearPackage',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CheckInRequestSchema',
            },
            example: {
              mobile: '201027494877',
              location: 'location',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Successfully Cleared package on location location',
                  data: {
                    user: 'object',
                  },
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/checkUserMacStatus': {
    post: {
      tags: ['User'],
      summary: 'Check User Mac Status',
      operationId: 'checkUserMacStatus',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CheckUserMacStatusRequest',
            },
            example: {
              mac: '2C:54:91:88:C9:E3',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message: 'Mac Address Status retrieved successfully',
                  data: 'Valid OR Expired OR Unkown',
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
  '/user/generateOtp': {
    post: {
      tags: ['User'],
      summary: 'Generate Otp',
      operationId: 'Generate Otp',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CheckUserMacStatusRequest',
            },
            example: {
              mobile: '201027494877',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'Ok',
          headers: {},
          content: {
            'application/json': {
              example: {
                example: {
                  status: true,
                  message:
                    'Successfully generate an OTP for mobile 201027494877.',
                  data: 'otp generated',
                },
              },
            },
          },
        },
        404: {
          description: 'Not Found',
        },
        422: {
          description: 'Input Validation',
        },
        500: {
          description: 'Server Error',
        },
      },
      deprecated: false,
    },
  },
};
