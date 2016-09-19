const Promise = require('bluebird');
const logger = require('../../configs/logger');
const CollectJamDates = require('./CollectJamDates');
const GET_USER_WITH_INSTRUMENT = `SELECT u.*, instr.instrument_id FROM user_jam_participation ujp
        LEFT JOIN user_jam_participation_instrument instr ON instr.user_jam_participation_id = ujp.id
        LEFT JOIN users u ON u.id = ujp.user_id 
        WHERE ujp.id = $1`;

class CreateJamDatesService {

    constructor({ app }) {
        this.db = app.locals.db;
    }

    getParticipantsByGenre (t) {
        return t.any('SELECT * FROM user_jam_participation_genre ORDER BY genre_id');
    }

    run () {
        // bucket by music genre

        // select * active participants.
        // for each, select user, instrument, skill,

        return new Promise(() => {

            this.db.tx((t) => {

                return this.getParticipantsByGenre(t)
                .then(( genreAndPartIds ) => {

                    return this.createGenreBuckets(genreAndPartIds, t);

                })

                
                .then(() => {
                    const collector = new CollectJamDates(this.genreBuckets);
                    return collector.collect(t);
                });
            });
        });
    }

    createGenreBuckets (genreAndPartIds, t) {
        this.genreBuckets = new Map();

        const fns = genreAndPartIds.map((genreAndPart) => {

            // get genre bucket
            let listOfPlayers = this.genreBuckets.get(genreAndPart.genre_id) || [];

            // fetch current user with instrument
            return this.fetchUserWithInstrument(genreAndPart.user_jam_participation_id, t)
            .then((userWithInstrument) => {

                // add user to this listOfPlayers
                if (userWithInstrument) {
                    listOfPlayers.push(userWithInstrument);

                    // put it back in
                    this.genreBuckets.add(genreAndPart.genre_id, listOfPlayers);
                }
                return true;
            });
        });
        logger.debug('BUCKETS: ', genreBuckets);
        
        return Promise.all(fns);
    }

    fetchUserWithInstrument (user_jam_participation_id, t) {
        return t.oneOrNone(GET_USER_WITH_INSTRUMENT, [user_jam_participation_id]);
    }


    // this.genreBuckets is now filled with users with instruments

    // TODO: TEST THIS FROM MOCHA
    


        // if there are complete jam groups, send email to every participants.
        // save the jam group to a new "current pending jam group", set all participants to in-active

    }
}

// sort into map

FOR EACH GENRE MAP FILL UP JAM GROUPS  

for each


SELECT * from users LEFT JOIN
