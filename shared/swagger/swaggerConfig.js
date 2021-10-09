module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'Winfi APP',
    description: 'App backend APIs documentation',
    contact: {
      name: 'API Support',
      url: 'http://www.appsite.com/support',
      email: 'support@app-name.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
    version: '1.0',
  },
  servers: [
    {
      url: `{protocol}://${process.env.SWAGGER_URL}/api/v0`,
      description: 'Development server (integration)',
      variables: {
        protocol: {
          enum: ['http', 'https'],
          default: 'http',
        },
      },
    },
  ],
  tags: [
    {
      name: 'User',
    },
  ],
};
