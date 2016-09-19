const pg = require('./pg');
const jackrabbit = require('jackrabbit');
const logger = require('../../configs/logger');
const EventEmitter = require('events').EventEmitter;

function Connector(config) {
    EventEmitter.call(this);

    const self = this;
    let readyCount = 0;

    this.db = pg.initialize(config).db;
    pg.ping()
        .then(() => {
            logger.info('Postgres connected');
            ready();
        })
        .catch((error) => {
            logger.error('Postgres connection failed', error);
            lost();
        });

    this.queue = jackrabbit(config.rabbitUrl)
        .on('connected', () => {
            logger.info('Rabbit connected');
            ready();
        })
        .on('error', (err) => {
            logger.error({ message: err, service: 'rabbitmq' });
        })
        .on('disconnected', () => {
            logger.error({ message: 'disconnected', service: 'rabbitmq' });
            lost();
        });

    function ready() {
        if (++readyCount === 2) { // eslint-disable-line
            self.emit('ready');
        }
    }

    function lost() {
        self.emit('lost');
    }
}

Connector.prototype = Object.create(EventEmitter.prototype);

module.exports = (config) => new Connector(config);
