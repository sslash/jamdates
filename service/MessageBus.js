/**
 * MESSAGE BUS
 * ------------
 * Publishers, and handlers should be next to each other
 */
const logger = require('../configs/logger');
const Promise = require('bluebird');
const uuid = require('node-uuid');
const EventEmitter = require('events').EventEmitter;

const connections = require('./lib/connections');
const ArticleModel = () => {};

const CREATE_JAM_DATES = 'jobs.create_jam_dates';

function App(config) {
    EventEmitter.call(this);

    this.config = config;
    this.connections = connections(config);
    this.connections.once('ready', this.onConnected.bind(this));
    this.connections.once('lost', this.onLost.bind(this));
}

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.onConnected = function () {
    let queues = 0;
    const QUEUE_COUNT = 1;
    // this.Article = ArticleModel(this.connections.db, this.config.mongo_cache);
    this.connections.queue.create(CREATE_JAM_DATES, { prefetch: 5 }, onCreate.bind(this));

    function onCreate() {
        if (++queues === QUEUE_COUNT) this.onReady();
    }
};

App.prototype.onReady = function () {
    logger.info('App ready');
    this.emit('ready');
};

App.prototype.onLost = function () {
    logger.info('app.lost');
    this.emit('lost');
};

App.prototype.subscribeToMessageBus = function () {
    this.connections.queue.handle(CREATE_JAM_DATES, this.handleCreateJamDatesJob.bind(this));
    return this;
};

App.prototype.publishCreateJamDates = function (requestId) {    
    this.connections.queue.publish(CREATE_JAM_DATES, { requestId });
    return Promise.resolve(requestId);
};

App.prototype.handleCreateJamDatesJob = function (job, ack) {
    logger.log({ type: 'info', msg: 'handling job', queue: CREATE_JAM_DATES, url: job.url });
    
    onSuccess();

    function onSuccess() {
        logger.info({ type: 'info', msg: 'job complete', status: 'success', url: job.url });
        ack();
    }

    function onError() {
        logger.info({ type: 'info', msg: 'job complete', status: 'failure', url: job.url });
        ack();
    }
};

module.exports = function createApp(config) {
    return new App(config);
};
