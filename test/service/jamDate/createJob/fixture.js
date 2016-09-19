// instrument ids
const GTR = 4;
const BASS = 1;
const DRMS = 10;
const KEYS = 12;


const guitarists = [
    { email: 'luke@mail.com', instrument_id: GTR },
    { email: 'luke2@mail.com', instrument_id: GTR },
    { email: 'luke3@mail.com', instrument_id: GTR },
    { email: 'luke4@mail.com', instrument_id: GTR },
    { email: 'luke5@mail.com', instrument_id: GTR },
    { email: 'luke6@mail.com', instrument_id: GTR },
    { email: 'luke7@mail.com', instrument_id: GTR },
    { email: 'luke8@mail.com', instrument_id: GTR },
    { email: 'luke9@mail.com', instrument_id: GTR },
    { email: 'luke10@mail.com', instrument_id: GTR },
    { email: 'slash@mail.com', instrument_id: GTR },
    { email: 'slash2@mail.com', instrument_id: GTR },
    { email: 'slash3@mail.com', instrument_id: GTR },
    { email: 'slash4@mail.com', instrument_id: GTR },
    { email: 'slash5@mail.com', instrument_id: GTR },
    { email: 'slash6@mail.com', instrument_id: GTR },
    { email: 'slash7@mail.com', instrument_id: GTR },
    { email: 'slash8@mail.com', instrument_id: GTR },
    { email: 'slash9@mail.com', instrument_id: GTR },
    { email: 'slash10@mail.com', instrument_id: GTR },
];

const bassPlayers = [
    { email: 'mike@mail.com', instrument_id: BASS },
    { email: 'mike2@mail.com', instrument_id: BASS },
    { email: 'mike3@mail.com', instrument_id: BASS },
    { email: 'mike4@mail.com', instrument_id: BASS },
    { email: 'mike5@mail.com', instrument_id: BASS },
    { email: 'mike6@mail.com', instrument_id: BASS },
    { email: 'mike7@mail.com', instrument_id: BASS },
    { email: 'mike8@mail.com', instrument_id: BASS },
    { email: 'mike9@mail.com', instrument_id: BASS },
    { email: 'mike10@mail.com', instrument_id: BASS },
];

const drummers = [
    { email: 'jeff@mail.com', instrument_id: DRMS },
    { email: 'jeff2@mail.com', instrument_id: DRMS },
    { email: 'jeff3@mail.com', instrument_id: DRMS },
    { email: 'jeff4@mail.com', instrument_id: DRMS },
    { email: 'jeff5@mail.com', instrument_id: DRMS },
    { email: 'jeff6@mail.com', instrument_id: DRMS },
    { email: 'jeff7@mail.com', instrument_id: DRMS },
    { email: 'jeff8@mail.com', instrument_id: DRMS },
    { email: 'jeff9@mail.com', instrument_id: DRMS },
    { email: 'jeff10@mail.com', instrument_id: DRMS },
];

const keyers = [
    { email: 'david@mail.com', instrument_id: KEYS },
    { email: 'david2@mail.com', instrument_id: KEYS },
    { email: 'david3@mail.com', instrument_id: KEYS },
    { email: 'david4@mail.com', instrument_id: KEYS },
    { email: 'david5@mail.com', instrument_id: KEYS },
    { email: 'david6@mail.com', instrument_id: KEYS },
    { email: 'david7@mail.com', instrument_id: KEYS },
    { email: 'david8@mail.com', instrument_id: KEYS },
    { email: 'david9@mail.com', instrument_id: KEYS },
    { email: 'david10@mail.com', instrument_id: KEYS },
];

module.exports = {
    guitarists,
    bassPlayers,
    drummers,
    keyers,
    // genres
    rap: 'rap',
    eighties: 'eighties',
    metal: 'metal',
    pop: 'pop',
    blues: 'blues',
};