const apiRoutes = require('./routes');

const routes = require('express').Router();
const apiRouter = require('express').Router();

// Routes
routes.use('/api/v1', apiRouter);

apiRouter.use('/user', apiRoutes);

module.exports = { routes };
