module.exports = {
  '/user/create': {
    post: {
      tags: ['User'],
      summary: 'Login',
      operationId: 'Login',
      parameters: [],
      requestBody: {
        description: '',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequestSchema',
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
  '/user/checkIn': {
    put: {
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
              restrictions: 'Not defined yet',
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
              phoneNumber: '201027494877',
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
};
