/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
    CHANGE_USERNAME,

    TOGGLE_INSTRUMENT,
    TOGGLE_GENRE,
    SELECT_SKILL,
    REGISTER_CONTACT_INFO,
    FETCH_INSTRUMENTS,
    FETCH_INSTRUMENTS_SUCCESS,
    FETCH_INSTRUMENTS_ERROR,
    FETCH_GENRES,
    FETCH_GENRES_SUCCESS,
    FETCH_GENRES_ERROR,
} from './constants';
import { fromJS, List, Record } from 'immutable';

// TODO: get these from server
// TODO: need instrumentId
// const instruments = List.of(
//     'guitar',
//     'bass',
//     'drums',
//     'keyboard',
//     'sing',
//     'saxophone',
// );

// // TODO: need genreId
// const genres = List.of(
//     'rock',
//     'pop',
//     'jazz',
//     'metal',
//     'rap',
//     'fusion',
// );

const InstrumentOption = Record({
    value: '',
    instrumentId: null,
    selected: false,
});

const GenreOption = Record({
    value: '',
    genreId: null,
    selected: false,
});

const User = Record({
    name: '',
    email: '',
});

// The initial state of the App
const initialState = fromJS({
    instruments: new List(), // instruments.map((value) => new Option({ value })),
    genres: new List(), // genres.map((value) => new Option({ value })),
    skillLevel: null,
    user: new User(),
});


function homeReducer(state = initialState, action) {
    switch (action.type) {

    case FETCH_INSTRUMENTS_SUCCESS:
        return state.set('instruments', action.result.data.map((instr) => {
            return new InstrumentOption({
                value: instr.name,
                instrumentId: instr.id,
                selected: false,
            });
        }));

    case FETCH_GENRES_SUCCESS:
        return state.set('genres', action.result.data.map((genre) => {
            return new GenreOption({
                value: genre.name,
                genreId: genre.id,
                selected: false,
            });
        }));


    case TOGGLE_INSTRUMENT:
        const { instrument } = action;

        return state.set('instruments', state.get('instruments').map((instr) => {
            return instr.get('value') === instrument ?
                    instr.set('selected', !instr.get('selected')) : instr;
        }));

    case TOGGLE_GENRE:
        const { genre } = action;

        return state.set('genres', state.get('genres').map((gn) => {
            return gn.get('value') === genre ?
                    gn.set('selected', !gn.get('selected')) : gn;
        }));

    case SELECT_SKILL:
        return state.set('skillLevel', action.skillLevel);

    case REGISTER_CONTACT_INFO:
        return state.set('user', new User({ name: action.name, email: action.email }));

    default:
        return state;
    }
}

export default homeReducer;
