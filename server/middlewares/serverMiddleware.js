/* eslint-disable global-require */
const express = require('express');
const path = require('path');
const config = require('../../configs/config');
const bodyParser = require('body-parser');
const MessageBus = require('../../service/MessageBus');

/**
 * Front-end middleware
 */
module.exports = (app, options) => {
    const isProd = process.env.NODE_ENV === 'production';
    app.locals.messageBus = MessageBus(config);
    app.locals.db = app.locals.messageBus.connections.db; 
    app.use(bodyParser.json()); // for parsing application/json
    
    return app;
};
