const express = require('express');
const JamDateController = require('../service/jamDate/JamDateController');

module.exports = ((app) => {
    const router = express.Router(); // eslint-disable-line new-cap
    const jamDateController = new JamDateController({ app });

    router.post('/jamdates', jamDateController.postJamdate);
    router.get('/instruments', jamDateController.getInstruments);
    router.get('/genres', jamDateController.getGenres);

    return router;
});
