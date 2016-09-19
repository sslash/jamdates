/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const CHANGE_USERNAME = 'boilerplate/Home/CHANGE_USERNAME';
export const TOGGLE_INSTRUMENT = 'dateSetup/TOGGLE_INSTRUMENT';
export const TOGGLE_GENRE = 'dateSetup/TOGGLE_GENRE';
export const SELECT_SKILL = 'dateSetup/SELECT_SKILL';
export const REGISTER_CONTACT_INFO = 'dateSetup/REGISTER_CONTACT_INFO';
export const JAMDATE_CREATE = 'dateSetup/JAMDATE_CREATE';
export const JAMDATE_CREATE_SUCCESS = 'dateSetup/JAMDATE_CREATE_SUCCESS';
export const JAMDATE_CREATE_ERROR = 'dateSetup/JAMDATE_CREATE_ERROR';

export const FETCH_INSTRUMENTS = 'dateSetup/FETCH_INSTRUMENTS';
export const FETCH_INSTRUMENTS_SUCCESS = 'dateSetup/FETCH_INSTRUMENTS_SUCCESS';
export const FETCH_INSTRUMENTS_ERROR = 'dateSetup/FETCH_INSTRUMENTS_ERROR';

export const FETCH_GENRES = 'dateSetup/FETCH_GENRES';
export const FETCH_GENRES_SUCCESS = 'dateSetup/FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_ERROR = 'dateSetup/FETCH_GENRES_ERROR';
