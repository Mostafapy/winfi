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
              groupName: 'group 1',
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
                  message: 'Successfully retrieved User data',
                  data: {},
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
  '/user/identify': {
    post: {
      tags: ['User'],
      summary: 'Identify App integrating with our apis',
      operationId: 'Identify',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginpRequest',
            },
            example: {
              mobile: '201027494877',
              uuid: 'dlfjlds19289120sdfk',
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
                  data: {
                    token: 'string',
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
};
