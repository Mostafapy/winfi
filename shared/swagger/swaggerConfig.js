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
      url: '{protocol}://164.90.183.201/api/v0',
      description: 'Development server (integration)',
      variables: {
        protocol: {
          enum: ['http', 'https'],
          default: 'http',
        },
      },
    },
    {
      url: '{protocol}://localhost:4000/api/v0',
      description: 'Localhost server (uses test data)',
      variables: {
        protocol: {
          enum: ['http'],
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
