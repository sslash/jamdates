/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
const api = require('./api');
const argv = require('minimist')(process.argv.slice(2));
const serverMiddleware = require('./middlewares/serverMiddleware');
const frontendMiddleware = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
serverMiddleware(app);
app.use('/api/v1', api(app));
frontendMiddleware(app, {
    // In production we need to pass these values in instead of relying on webpack
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
    if (err) {
      return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
    if (ngrok) {
      ngrok.connect(port, (innerErr, url) => {
        if (innerErr) {
          return logger.error(innerErr);
      }

        logger.appStarted(port, url);
    });
  } else {
      logger.appStarted(port);
  }
});
