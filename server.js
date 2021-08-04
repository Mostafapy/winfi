require('dotenv').config({ path: '.env' });
const express = require('express');
const { Logger } = require('./utils/logger');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { errorHandler } = require('./middleware/errorHandler');
const { swaggerDocs } = require('./shared/swagger');

// Initialize App
const app = express();

// Swager URI
app.use('/api/v0/explore', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

// Intialize Logger
const logger = new Logger('App');

if (process.env.NODE_ENV === 'development') {
  app.use(
    morgan((tokens, req, res) =>
      [
        `<${process.env.NODE_ENV}>`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res),
        'ms',
      ].join(' '),
    ),
  );
}

// Port
const port = process.env.PORT || '3000';

// Error Handling Middleware
app.use(errorHandler);

// Listen
const server = app.listen(port, () =>
  logger.log(`App Listen Successfully To Port ${port}`),
);

// Unhandled Promise Rejection Handler
process.on('unhandledRejection', (ex) => {
  logger.error(`${ex.message}`, ex);
  app.use((_req, res) => {
    res.status(500).json({
      success: false,
      msg: '500 Internet Error',
      data: null,
    });
  });

  server.close(() => process.exit(1));
});
