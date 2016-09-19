import request from 'utils/request';
/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
    CHANGE_USERNAME,


    TOGGLE_INSTRUMENT,
    TOGGLE_GENRE,
    SELECT_SKILL,
    REGISTER_CONTACT_INFO,
    JAMDATE_CREATE,
    JAMDATE_CREATE_SUCCESS,
    JAMDATE_CREATE_ERROR,

    FETCH_INSTRUMENTS,
    FETCH_INSTRUMENTS_SUCCESS,
    FETCH_INSTRUMENTS_ERROR,

    FETCH_GENRES,
    FETCH_GENRES_SUCCESS,
    FETCH_GENRES_ERROR,
} from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(name) {
    return {
        type: CHANGE_USERNAME,
        name,
    };
}

export function fetchInstruments() {
    return (dispatch) => {
        dispatch({ type: FETCH_INSTRUMENTS });

        const url = '/api/v1/instruments';

        // Call our request helper (see 'utils/request')
        request(url)
            .then((result) => dispatch({
                type: FETCH_INSTRUMENTS_SUCCESS,
                result,
            }))
            .catch((error) => dispatch({
                type: FETCH_INSTRUMENTS_ERROR,
                error,
            }));
    };
}


export function fetchGenres() {
    return (dispatch) => {
        dispatch({ type: FETCH_GENRES });

        const url = '/api/v1/genres';

        // Call our request helper (see 'utils/request')
        request(url)
            .then((result) => dispatch({
                type: FETCH_GENRES_SUCCESS,
                result,
            }))
            .catch((error) => dispatch({
                type: FETCH_GENRES_ERROR,
                error,
            }));
    };
}


export function toggleInstrument(instrument) {
    return {
        type: TOGGLE_INSTRUMENT,
        instrument,
    };
}

export function toggleGenre(genre) {
    return {
        type: TOGGLE_GENRE,
        genre,
    };
}

export function selectSkill(skillLevel) {
    return {
        type: SELECT_SKILL,
        skillLevel,
    };
}

export function registerContactInfo({ email, name }) {
    return (dispatch, getState) => {
        dispatch({
            type: REGISTER_CONTACT_INFO,
            email,
            name,
        });

        const url = '/api/v1/jamdates';
        const body = getState().get('home').toJSON();
        body.instruments = body.instruments.filter((instr) => !!instr.selected);
        body.genres = body.genres.filter((genre) => !!genre.selected);
        body.skillLevels = body.instruments.map((instr) => ({
            value: body.skillLevel || 10, // just temporary
            instrumentId: instr.instrumentId,
        }));

        dispatch({
            type: JAMDATE_CREATE,
            body,
        });

        // Call our request helper (see 'utils/request')
        request(url, { body, method: 'post' })
            .then((result) => dispatch({
                type: JAMDATE_CREATE_SUCCESS,
                result,
            }))
            .catch((error) => dispatch({
                type: JAMDATE_CREATE_ERROR,
                error,
            }));
    };
}
