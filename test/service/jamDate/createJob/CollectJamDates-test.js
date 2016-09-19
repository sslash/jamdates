require('better-log/install');
const { expect } = require('chai');
const CollectJamDates = require('../../../../service/jamDate/createJob/CollectjamDates');

const {
    // instrumentalists
    guitarists,
    bassPlayers,
    drummers,
    keyers,

    // geners
    rap,
    eighties,
    metal,
    pop,
    blues,
} = require('./fixture');

describe('Collect jam dates', () => {
    it ('should create a blues group', () => {

        // TODO: CONTINUE HERE and create tests for 
        // having a map like this:
        /*
         * genreBuckets: {
         *      rap: [ {email: 'sap@mail.com', instrumentId: 10},{email: 'sap@mail.com', instrumentId: 11},{email: 'sap@mail.com', instrumentId: 12} ],
         *      metal: [ {email: 'sap4@mail.com', instrumentId: 11},{email: 'sa77p@mail.com', instrumentId: 11},{email: 'sapj@mail.com', instrumentId: 12} ],
         * }
         * 
         */ 
        const genreBuckets = new Map();
        
        const rapBucket = guitarists.slice(0, 3).concat(
            bassPlayers.slice(1, 4)).concat(
            drummers.slice(2, 5)).concat(
            keyers.slice(3, 7));

        genreBuckets.set(rap, rapBucket);

        const jamGroups = new CollectJamDates(genreBuckets).collect();

        jamGroups.forEach(jamGroup => {
            console.log('\n');
            Object.keys(jamGroup).forEach(k => {
                console.log(`[${k}]     `, jamGroup[k]);
            })
        })

    });
});
