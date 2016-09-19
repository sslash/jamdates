const JamDateDAO = require('./JamDateDAO');
const logger = require('../../configs/logger');
const uuid = require('node-uuid');
const bindAll = require('lodash/bindAll');

class JamDateService {

    constructor({ app }) {
        this.app = app;
        this.jamDateDAO = new JamDateDAO({ app });
        bindAll(this, 'registerJamDateParticipant', 'getInstruments', 'getGenres');
    }

    // creates a new user and triggers job
    registerJamDateParticipant(data) {
        const requestId = uuid.v1();

        return this.jamDateDAO.registerJamDateParticipant(data)
        .then(() => this.app.locals.messageBus.publishCreateJamDates(requestId))
        .catch((error) => {
            logger.warn('Failed to registerJamDateParticipant', requestId, error);
            throw error;
        });
    }

    getInstruments () { return this.jamDateDAO.getInstruments(); }
    getGenres () { return this.jamDateDAO.getGenres(); }

}

module.exports = JamDateService;