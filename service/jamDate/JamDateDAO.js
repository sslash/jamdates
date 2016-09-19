const GET_USER = 'SELECT * FROM users WHERE email = $1';
const CREATE_USER = 'INSERT INTO users (email, name) VALUES ($1, $2)';
const GET_SKILL = 'SELECT * FROM skill_level WHERE instrument_id = $1 AND user_id = $2';
const UPDATE_SKILL = 'UPDATE skill_level SET value = $1 WHERE instrument_id = $2 AND user_id = $3';
const CREATE_SKILL = 'INSERT INTO skill_level (value, instrument_id, user_id) VALUES ($1, $2, $3)';
const CREATE_USER_PARTICIPATION = 'INSERT INTO user_jam_participation (user_id) VALUES ($1) RETURNING id';
const CREATE_USER_PART_INSTRUMENT = 'INSERT INTO user_jam_participation_instrument (user_jam_participation_id, instrument_id) VALUES ($1, $2)';
const CREATE_USER_PART_GENRE = 'INSERT INTO user_jam_participation_genre (user_jam_participation_id, genre_id) VALUES ($1, $2)';
const bindAll = require('lodash/bindAll');


class JamDateDAO {

    constructor({ app }) {
        this.db = app.locals.db;
        bindAll(this, ['resolveDb', 'createUser', 'upsertSkillLevel', 'createSkills', 'getUser',
        'createUserJamParticipation', 'createUserPartInstrument', 'createUserPartInstruments',
        'createUserPartGenre', 'createUserPartGenres', 'registerJamDateParticipant',
        'getInstruments', 'getGenres']);
    }

    resolveDb(t) { return t || this.db; }

    createUser(data, t) {
        return this.resolveDb(t).none(CREATE_USER, [data.user.email, data.user.name])
            .then(() => {
                return this.resolveDb(t).one(GET_USER, [data.user.email]);
            });
    }

    upsertSkillLevel(sl, userId, t) {
        return this.resolveDb(t).oneOrNone(GET_SKILL, [sl.instrumentId, userId])
        .then((res) => {
            if (res) {
                return this.resolveDb(t).none(UPDATE_SKILL, [sl.value, sl.instrumentId, userId]);
            } else {
                return this.resolveDb(t).none(CREATE_SKILL, [sl.value, sl.instrumentId, userId]);
            }
        });
    }

    createSkills(skillLevels, user, value, t) {
        const fns = (skillLevels || []).map((sl) => {
            return this.upsertSkillLevel(sl, user.id, t);
        });

        // TODO: might not wanna do promise.all here
        return Promise.all(fns);
    }

    getUser(email, t) {
        return this.resolveDb(t).oneOrNone(GET_USER, [email]);
    }

    createUserJamParticipation(userId, t) {
        return this.resolveDb(t).one(CREATE_USER_PARTICIPATION, userId);
    }

    createUserPartInstrument(participationId, instrumentId, t) {
        return this.resolveDb(t).none(CREATE_USER_PART_INSTRUMENT, [participationId, instrumentId]);
    }

    createUserPartInstruments(userAndPart, instruments, t) {
        const fns = (instruments || []).map((instrument) => {
            return this.createUserPartInstrument(
                userAndPart.userJamParticipation.id,
                instrument.instrumentId,
                t
            );
        });

        return Promise.all(fns);
    }

    createUserPartGenre(participationId, genreId, t) {
        return this.resolveDb(t).none(CREATE_USER_PART_GENRE, [participationId, genreId]);
    }

    createUserPartGenres(userAndPart, genres, t) {
        const fns = (genres || []).map((genre) => {
            return this.createUserPartInstrument(
                userAndPart.userJamParticipation.id,
                genre.genreId,
                t
            );
        });

        return Promise.all(fns);
    }

    registerJamDateParticipant(data) {
        return this.resolveDb().tx((t) => {
            return this.getUser(data.user.email, t)

            // upsert user
            .then((res) => res ? res : this.createUser(data, t))

            // create skill level
            .then((userResult) => {
                return this.createSkills(data.skillLevels, userResult, t)

                // keep the user
                .then(() => { return userResult; });
            })

            // create participant
            .then((userResult) => {
                return this.createUserJamParticipation(userResult.id, t)
                .then((userJamParticipation) => {
                    return {
                        userJamParticipation,
                        userResult,
                    };
                });
            })

            // create instrument(s)
            .then((userAndPart) => {
                return this.createUserPartInstruments(userAndPart, data.instruments, t)
                .then(() => { return userAndPart; });
            })

            // create genre(s)
            .then((userAndPart) => {
                return this.createUserPartGenres(userAndPart, data.genres, t)
                .then(() => { return userAndPart; });
            });
        });
    }

    // MOVE THESE OUT

    getInstruments() {
        return this.resolveDb().any('SELECT * FROM instrument');
    }
    getGenres() {
        return this.resolveDb().any('SELECT * FROM genre');
    }
}

module.exports = JamDateDAO;

// TODO: fetch instr and genre from frontend on start
// use that when you register
