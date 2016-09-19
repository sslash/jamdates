const logger = require('../../configs/logger');
const JamDateService = require('./JamDateService');
const bindAll = require('lodash/bindAll');

class JamDateController {
    constructor({ app }) {
        this.app = app;
        this.jamDateService = new JamDateService({ app });
        bindAll(this, 'postJamdate', 'getInstruments', 'getGenres');
    }

    postJamdate(req, res, next) {
        const data = req.body;

        console.log('Post jam data', data);
        this.jamDateService.registerJamDateParticipant(data)
        .then((result) => res.json(result))
        .catch((err) => next(err));
    }

    getInstruments(req, res, next) {
        return this.jamDateService.getInstruments()
        .then((result) => res.json(result))
        .catch(next);
    }

    getGenres(req, res, next) {
        return this.jamDateService.getGenres()
        .then((result) => res.json(result))
        .catch(next);
    }
}

module.exports = JamDateController;
