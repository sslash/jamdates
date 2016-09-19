const http = require('http');
const logger = require('../configs/logger');

const config = require('../configs/config');
const MessageBus = require('../service/MessageBus');

http.globalAgent.maxSockets = Infinity;

start();

function start() {
    logger.info('Starting worker');

    const instance = MessageBus(config);

    instance.on('ready', beginWork);
    process.on('SIGTERM', shutdown);

    function beginWork() {
        instance.on('lost', shutdown);
        instance.subscribeToMessageBus();
    }

    function shutdown() {
        logger.log({ type: 'info', msg: 'shutting down' });
        process.exit();
    }
}